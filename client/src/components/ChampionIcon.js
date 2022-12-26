import './ChampionIcon.css'

const ChampionIcon = ({selectedChamp, handleSelection, champ}) => {
  const handleClick = () => {
    handleSelection(champ)
  }

  return (
    <div onClick={handleClick} className={ `champion-icon ${selectedChamp === champ ? "selected" : "" } ${champ[2] ? "disabled" : ""}` }>
      <img src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champ[1].image.full}`} alt="" />
      <p className="champion-name">{champ[1].name}</p>
    </div>
  );
}

export default ChampionIcon;
