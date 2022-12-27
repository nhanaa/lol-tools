import { useEffect, useState } from 'react';
import Ban from '../components/Ban';
import BluePick from '../components/BluePick';
import ChampionIcon from '../components/ChampionIcon';
import RedPick from '../components/RedPick';
import SearchBar from '../components/SearchBar';
import './Home.css';

const Home = () => {
  const [championObjects, setChampionObjects] = useState([]);
  const [selectedBanPick, setSelectedBanPick] = useState("");
  const [selectedBanPick2, setSelectedBanPick2] = useState("");
  const [selectedChamp, setSelectedChamp] = useState(null);
  const [bluePicks, setBluePicks] = useState({"B1": null, "B2": null, "B3": null, "B4": null, "B5": null});
  const [redPicks, setRedPicks] = useState({"R1": null, "R2": null, "R3": null, "R4": null, "R5": null});
  const [blueBans, setBlueBans] = useState({"b1": null, "b2": null, "b3": null, "b4": null, "b5": null});
  const [redBans, setRedBans] = useState({"r1": null, "r2": null, "r3": null, "r4": null, "r5": null});
  const [searchKey, setSearchKey] = useState("");

  const fetchChampions = async () => {
    const data = localStorage.getItem("championObjects");

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
      localStorage.setItem(newData, "championObjects");

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
  const handleBanPickSelection = (order) => {
    if (selectedBanPick !== "") {
      setSelectedBanPick2(order);
      return;
    }
    setSelectedBanPick(order);
  }

  // Handle champ selection
  const handleChampSelection = (champ) => {
    setSelectedChamp(champ);
  }

  // Reset the selected champ and selected ban pick states
  const reset = () => {
    setSelectedBanPick("");
    setSelectedBanPick2("");
    setSelectedChamp(null);
  }

  // Revert the disabled property of the champion icon
  const revertDisabled = (targetChamp) => {
    setChampionObjects(prevChampionObjects => {
      let index = prevChampionObjects.findIndex(champ => champ[0] === targetChamp[0]);
      prevChampionObjects[index][2] = !prevChampionObjects[index][2];
      return prevChampionObjects;
    });
  }

  // Check to see if both a ban/pick and a champ are selected
  // if yes then update the ban/pick
  useEffect(() => {
    // Update the ban/pick with a selected champ
    const updateBanPick = (setState) => {
      setState(prevState => {
        if (prevState[selectedBanPick] !== null) {
          revertDisabled(prevState[selectedBanPick]);
        }
        prevState[selectedBanPick] = selectedChamp;
        return {...prevState};
      });
    }

    if (selectedChamp && selectedBanPick) {
      switch (selectedBanPick[0]) {
        case "B":
          updateBanPick(setBluePicks);
          break;
        case "R":
          updateBanPick(setRedPicks);
          break;
        case "b":
          updateBanPick(setBlueBans);
          break;
        case "r":
          updateBanPick(setRedBans);
          break;
        default:
          break;
      }
      revertDisabled(selectedChamp);
      reset();
    }
  }, [selectedBanPick, selectedChamp]);

  // Check and swap two pick/ban when two are selected
  useEffect(() => {
    // Swap champs between two order of ban/pick
    const swapChamp = (banPick1, setBanPick1, order1, banPick2, setBanPick2, order2) => {
      const temp1 = banPick1[order1];
      const temp2 = banPick2[order2];
      setBanPick1(prevBanPick1 => {
        prevBanPick1[order1] = temp2;
        return {...prevBanPick1};
      });
      setBanPick2(prevBanPick2 => {
        prevBanPick2[order2] = temp1;
        return {...prevBanPick2};
      })
    }
    // Check for each case of selectedBanPick2
    const swapCase = (banPick1, setBanPick1) => {
      switch (selectedBanPick2[0]) {
        case "B":
          swapChamp(banPick1, setBanPick1, selectedBanPick, bluePicks, setBluePicks, selectedBanPick2);
          break;
        case "R":
          swapChamp(banPick1, setBanPick1, selectedBanPick, redPicks, setRedPicks, selectedBanPick2);
          break;
        case "b":
          swapChamp(banPick1, setBanPick1, selectedBanPick, blueBans, setBlueBans, selectedBanPick2);
          break;
        case "r":
          swapChamp(banPick1, setBanPick1, selectedBanPick, redBans, setRedBans, selectedBanPick2);
          break;
        default:
          break;
      }
    }
    if (selectedBanPick && selectedBanPick2) {
      switch (selectedBanPick[0]) {
        case "B":
          swapCase(bluePicks, setBluePicks);
          break;
        case "R":
          swapCase(redPicks, setRedPicks);
          break;
        case "b":
          swapCase(blueBans, setBlueBans);
          break;
        case "r":
          swapCase(redBans, setRedBans);
          break;
        default:
          break;
      }
      reset();
    }
  }, [selectedBanPick, selectedBanPick2])

  return (
    <div className="home">

      <div className="ban-pick-header">
        <div className="blue-team">
          <h3>Blue team</h3>
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
        <div className="red-team">
          <h3>Red team</h3>
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
          {Object.entries(bluePicks).map(pick => (
            <BluePick champ={pick[1]} selectedBanPick={selectedBanPick} handleSelection={handleBanPickSelection} order={pick[0]}/>
          ))}
        </div>
        <div className="champions">
          <SearchBar searchKey={searchKey} setSearchKey={setSearchKey}/>
          <div className="champion-icon-grid">
            {championObjects.map((champ) => {
              if (searchKey !== "" && champ[1].name.toLowerCase().startsWith(searchKey.toLowerCase())) {
                return (
                  <ChampionIcon selectedChamp={selectedChamp} handleSelection={handleChampSelection} champ={champ} />
                )
              }
              else if (searchKey === "") {
                return (
                  <ChampionIcon selectedChamp={selectedChamp} handleSelection={handleChampSelection} champ={champ} />
                )
              }
              else return null;
            })}
          </div>
        </div>
        <div className="red-picks">
            {Object.entries(redPicks).map(pick => (
              <RedPick champ={pick[1]} selectedBanPick={selectedBanPick} handleSelection={handleBanPickSelection} order={pick[0]}/>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
