import './Pick.css';

const BluePick = ({champ, selectedBanPick, handleSelection, order}) => {
  const handleClick = () => {
    handleSelection(order);
  }

  return (
    <div onClick={handleClick} className={`pick ${selectedBanPick === order ? "selected" : ""}`}>
      <span className="pick-order">{order}</span>
      <span className="pick-icon">
        {champ && <img src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champ[1].image.full}`} alt="" />}
      </span>
    </div>
  );
}

export default BluePick;
