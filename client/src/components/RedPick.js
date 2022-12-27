import './Pick.css';

const RedPick = ({champ, selectedBanPick, handleSelection, order}) => {
  const handleClick = () => {
    handleSelection(order);
  }

  return (
    <div onClick={handleClick} className={`pick ${selectedBanPick === order ? "selected" : ""}`}>
      <span className="pick-icon">
        {champ && <img src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champ[1].image.full}`} alt="" />}
      </span>
      <span className="pick-order">{order}</span>
  </div>
  );
}

export default RedPick;
