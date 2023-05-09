const Coin = ({ setTotalCoins }) => {

  const handleCoinClick = (value) => {
    setTotalCoins((prevTotalCoins) => prevTotalCoins + value);
  };

  return (
    <div className="coinbox">
      <div className="title">
        <h2>Introduza moedas:</h2>
      </div>
      <div className="moedas">
        <button onClick={() => handleCoinClick(5)}>{5} cent</button>
        <button onClick={() => handleCoinClick(10)}>{10} cent</button>
        <button onClick={() => handleCoinClick(20)}>{20} cent</button>
        <button onClick={() => handleCoinClick(50)}>{50} cent</button>
      </div>
    </div>
  );
};

export default Coin;
