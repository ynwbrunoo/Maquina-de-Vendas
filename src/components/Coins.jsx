import { toast } from 'react-toastify';

const Coin = ({ setTotalCoins }) => {

  const handleCoinClick = (value) => {
    setTotalCoins((prevTotalCoins) => prevTotalCoins + value);
    if(value < 100){
      toast(`Introduziu a moeda de ${value} cent!`, { autoClose: 1500 });
    } else {
      toast(`Introduziu a moeda de ${value / 100} EUR!`, { autoClose: 1500 });
    }
  };

  return (
    <div className="coinbox">
      <div className="title">
        <h2>Introduza moedas</h2>
      </div>
      <div className="moedas">
        <button onClick={() => handleCoinClick(5)}>{5} cent</button>
        <button onClick={() => handleCoinClick(10)}>{10} cent</button>
        <button onClick={() => handleCoinClick(20)}>{20} cent</button>
        <button onClick={() => handleCoinClick(50)}>{50} cent</button>
        <button onClick={() => handleCoinClick(100)}>{1} EUR</button>
        <button onClick={() => handleCoinClick(200)}>{2} EUR</button>
      </div>
    </div>
  );
};

export default Coin;
