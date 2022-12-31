import { useCallback, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './Home.css';
import { useBanPick } from '../hooks/useBanPick';
import { useAuthContext } from '../hooks/useAuthContext';
import loadDrafts from '../functions/loadDrafts';


// import components
import Ban from '../components/Ban';
import BluePick from '../components/BluePick';
import ChampionIcon from '../components/ChampionIcon';
import RedPick from '../components/RedPick';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const { user } = useAuthContext();

  const [championObjects, setChampionObjects] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [blueName, setBlueName] = useState("Blue team");
  const [redName, setRedName] = useState("Red team");
  const [draftName, setDraftName] = useState("New Draft");
  const [draftID, setDraftID] = useState(null);

  const [selectedBanPick, setSelectedBanPick] = useState("");
  const [selectedBanPick2, setSelectedBanPick2] = useState("");
  const [selectedChamp, setSelectedChamp] = useState(null);

  // Revert the disabled property of the champion icons
  const revertDisabled = (targetChamp) => {
    setChampionObjects(prevChampionObjects => {
      let index = prevChampionObjects.findIndex(champ => champ[0] === targetChamp[0]);
      prevChampionObjects[index][2] = !prevChampionObjects[index][2];
      return prevChampionObjects;
    });
  }

  // Reset the disabled property of the champion icons
  const resetDisabled = () => {
    setChampionObjects(prevChampionObjects => {
      prevChampionObjects.forEach(champ => {
        champ[2] = false;
      })
      return prevChampionObjects;
    });
  }

  const [{blueBans, redBans, bluePicks, redPicks}, dispatch] = useBanPick(revertDisabled);

  const fetchChampions = async () => {
    const data = JSON.parse(localStorage.getItem("championObjects"));

    if (!data) { // Check if there is cached data
      const response  = await fetch("/api/champions");

      const json = await response.json();

      if (!response.ok) {
        console.log("error");
        return;
      }

      // Add a boolean value to denote if the champ is disabled or not
      const newData = Object.entries(json.data);
      for (let i = 0; i < newData.length; ++i) {
        newData[i].push(false);
      }

      // Cache data in localStorage
      localStorage.setItem("championObjects", JSON.stringify(newData));

      setChampionObjects(newData);
    }
    else {
      setChampionObjects(data);
    }
  }

  // Fetch the champion icons for selection for
  // first render
  useEffect(() => {
    fetchChampions();
  }, []);

  // Handle ban pick selection

  const handleBanPickSelection = useCallback((order) => {
    if (selectedBanPick !== "") {
      setSelectedBanPick2(order);
      return;
    }
    setSelectedBanPick(order);
  }, [selectedBanPick]);

  // Handle champ selection
  const handleChampSelection = useCallback((champ) => {
    setSelectedChamp(champ);
  }, [])

  // Reset the selected champ and selected ban pick states
  const reset = () => {
    setSelectedBanPick("");
    setSelectedBanPick2("");
    setSelectedChamp(null);
  }

  useEffect(() => {
    // Check if both a ban/pick and champ are selected
    if (selectedBanPick && selectedChamp) {
      dispatch({
        type: "update",
        payload: [selectedBanPick, selectedChamp]
      });
      revertDisabled(selectedChamp);
      reset();
    }

    // Check if two ban/picks are selected
    if (selectedBanPick && selectedBanPick2) {
      dispatch({
        type: "swap",
        payload: [selectedBanPick, selectedBanPick2]
      });
      reset();
    }
  }, [selectedBanPick, selectedBanPick2, selectedChamp, dispatch]);

  // Save the draft to the database
  const saveDraft = async () => {
    if (draftID) { // This draft is an existing draft
      const response = await fetch(`api/draft/update/${draftID}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({draftName, blueName, redName, blueBans, redBans, bluePicks, redPicks})
      })

      const json = await response.json();

      if (!response.ok) {
        console.log("Error getting response");
      }
      if (response.ok) {
        console.log("Draft updated", json);
      }
    }
    else { // This draft is a new draft
      console.log(user.token);
      const response = await fetch("api/draft/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({draftName, blueName, redName, blueBans, redBans, bluePicks, redPicks})
      })

      const json = await response.json();

      if (!response.ok) {
        console.log("Error getting response");
        console.log(json);
      }
      if (response.ok) {
        console.log("New draft added", json);
      }
    }
  }

  // Handle action when clicking on save button
  const handleSave = () => {
    if (user) {
      confirmAlert({
        title: "Confirm to save draft",
        message: "Are you sure to save this draft?",
        buttons: [
          {
            label: "Yes",
            onClick: () => saveDraft()
          },
          {
            label: "No",
            onClick: () => null
          }
        ]
      });
    }
    else {
      confirmAlert({
        title: "Please login first",
        buttons: [{
          label: "Ok",
          onClick: () =>  null
        }]
      })
    }
  }

  // Load the selected draft on click
  const handleClickLoad = useCallback((draft) => {
    console.log("Loading the draft");
    setDraftName(draft["draftName"]);
    setBlueName(draft["blueName"]);
    setRedName(draft["redName"]);
    setDraftID(draft["_id"]);
    const {blueBans, redBans, bluePicks, redPicks} = draft;
    resetDisabled();
    dispatch({
      type: "load",
      payload: {blueBans, redBans, bluePicks, redPicks}
    });
  },[dispatch]);

  // Delete the selected draft on click
  const handleClickDelete = useCallback(async (draft) => {
    console.log(draft);

    const response = await fetch(`/api/draft/delete/${draft._id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      console.log("Error");
    }

    return json;

  }, [user]);

  // Fetch all drafts
  const fetchDrafts = async () => {
    const response =  await fetch("api/draft/fetch", {
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    });

    const json = await response.json();

    if (!response.ok) {
      console.log("Error");
    }

    return json;
  }

  // Display the available drafts to load
  const handleLoad = async () => {
    if (user) {
      const drafts = await fetchDrafts();
      loadDrafts(drafts, handleClickLoad, handleClickDelete);
    }
    else {
      confirmAlert({
        title: "Please login first",
        buttons: [{
          label: "Ok",
          onClick: () =>  null
        }]
      })
    }
  }

  // Update the names properties of the draft
  const handleBlueNameChange = (e) => {
    e.preventDefault();
    setBlueName(e.target.value);
  }
  const handleRedNameChange = (e) => {
    e.preventDefault();
    setRedName(e.target.value);
  }
  const handleDraftNameChange = (e) => {
    e.preventDefault();
    setDraftName(e.target.value);
  }

  return (
    <div className="home">

      <div className="ban-pick-header">
        <div className="blue-team">
          <form className="name">
            <input className="name-value" onChange={handleBlueNameChange} value={blueName}></input>
          </form>
          <div className="ban">
            <div className="ban1-3">
              <Ban champ={blueBans["b1"]} selectedBanPick={selectedBanPick} handleSelection={handleBanPickSelection} order={"b1"} />
              <Ban champ={blueBans["b2"]} selectedBanPick={selectedBanPick} handleSelection={handleBanPickSelection} order={"b2"} />
              <Ban champ={blueBans["b3"]} selectedBanPick={selectedBanPick} handleSelection={handleBanPickSelection} order={"b3"} />
            </div>
            <div className="ban4-5">
              <Ban champ={blueBans["b4"]} selectedBanPick={selectedBanPick} handleSelection={handleBanPickSelection} order={"b4"} />
              <Ban champ={blueBans["b5"]} selectedBanPick={selectedBanPick} handleSelection={handleBanPickSelection} order={"b5"} />
            </div>
          </div>
        </div>
        <div className="save-load-draft">
          <form className="name">
            <input className="name-value" onChange={handleDraftNameChange} value={draftName}></input>
          </form>
          <button className="save-draft" onClick={handleSave}>Save draft</button>
          <button className="load-draft" onClick={handleLoad}>Load draft</button>
        </div>
        <div className="red-team">
          <form className="name">
            <input className="name-value" onChange={handleRedNameChange} value={redName}></input>
          </form>
          <div className="ban">
            <div className="ban4-5">
              <Ban champ={redBans["r5"]} selectedBanPick={selectedBanPick} handleSelection={handleBanPickSelection} order={"r5"} />
              <Ban champ={redBans["r4"]} selectedBanPick={selectedBanPick} handleSelection={handleBanPickSelection} order={"r4"} />
            </div>
            <div className="ban1-3">
              <Ban champ={redBans["r3"]} selectedBanPick={selectedBanPick} handleSelection={handleBanPickSelection} order={"r3"} />
              <Ban champ={redBans["r2"]} selectedBanPick={selectedBanPick} handleSelection={handleBanPickSelection} order={"r2"} />
              <Ban champ={redBans["r1"]} selectedBanPick={selectedBanPick} handleSelection={handleBanPickSelection} order={"r1"} />
            </div>
          </div>
        </div>
      </div>

      <div className="ban-pick-body">
        <div className="blue-picks">
          {Object.entries(bluePicks).map((pick, index) => (
            <BluePick key={index} champ={pick[1]} selectedBanPick={selectedBanPick} handleSelection={handleBanPickSelection} order={pick[0]}/>
          ))}
        </div>
        <div className="champions">
          <SearchBar searchKey={searchKey} setSearchKey={setSearchKey}/>
          <div className="champion-icon-grid">
            {championObjects
              .filter(champ => (searchKey === "" || champ[1].name.toLowerCase().startsWith(searchKey.toLowerCase())))
              .map((champ, index) => {
                return (
                  <ChampionIcon key={index} selectedChamp={selectedChamp} handleSelection={handleChampSelection} champ={champ} />
                )
              })}
          </div>
        </div>
        <div className="red-picks">
            {Object.entries(redPicks).map((pick, index) => (
              <RedPick key={index} champ={pick[1]} selectedBanPick={selectedBanPick} handleSelection={handleBanPickSelection} order={pick[0]}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
