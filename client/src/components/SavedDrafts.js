import './SavedDrafts.css'

const SavedDrafts = ({handleClickLoad, handleClickDelete, onClose, draft}) => {
  const handleClickLoadButton = () => {
    handleClickLoad(draft);
    onClose();
  }

  const handleClickDeleteButton = async () => {
    handleClickDelete(draft);
    onClose();
  }

  const getChampNames = (group) => {
    const champs = Object.entries(draft[group]);
    let champsStr = "";
    champs.forEach(champ => {
      if (champ[1] === null) {
        champsStr += "none"
      }
      else {
        champsStr += champ[1][1].name;
      }
      champsStr += " ";
    })
    return champsStr;
  }

  return (
    <div className="draft" >
      <span className="draft-name"><strong>Name</strong>: {draft["draftName"]}</span>
      <span className="draft-teams"><strong>Team</strong>: {draft["blueName"]} vs {draft["redName"]}</span>
      <span className="draft-bans"><strong>Blue Bans</strong>: {getChampNames("blueBans")}</span>
      <span className="draft-bans"><strong>Red Bans</strong>: {getChampNames("redBans")}</span>
      <span className="draft-bans"><strong>Blue Picks</strong>: {getChampNames("bluePicks")}</span>
      <span className="draft-bans"><strong>Red Picks</strong>: {getChampNames("redPicks")}</span>
      <span className="draft-time"><strong>Created at</strong>: {draft["createdAt"]}</span>
      <div className="draft-buttons">
        <button onClick={handleClickLoadButton} className="load">Load</button>
        <button onClick={handleClickDeleteButton} className="delete">Delete</button>
      </div>
    </div>
  );
}

export default SavedDrafts;
