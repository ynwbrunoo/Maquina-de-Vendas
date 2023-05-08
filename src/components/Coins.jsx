import { useState } from "react";

const Coin = ({ setTotalCoins }) => {
  // eslint-disable-next-line no-unused-vars
  const [moeda, _] = useState(20);

  const handleCoinClick = (moeda) => {
    setTotalCoins((prevTotalCoins) => prevTotalCoins + moeda);
  };

  return (
    <div className="coinbox">
      <div className="title">
        <h2>Introduza moedas:</h2>
      </div>
      <div className="moedas">
      <button onClick={() => handleCoinClick(moeda)}>{moeda} cent</button>
      </div>
    </div>
  );
};

export default Coin;