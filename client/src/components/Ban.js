import './Ban.css'

const Ban = ({champ, selectedBanPick, handleSelection, order}) => {
  const handleClick = () => {
    handleSelection(order);
  }

  return (
    <div onClick={handleClick} className={`ban-item ${selectedBanPick === order ? "selected" : ""}`}>
      {champ && <img src={`https://ddragon.leagueoflegends.com/cdn/12.23.1/img/champion/${champ[1].image.full}`} alt="" />}
      {!champ && <span className="ban-order">Ban {order[1]}</span>}
    </div>
  );
}

export default Ban;
