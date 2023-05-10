import { toast } from 'react-toastify';

const Coin = ({ setTotalCoins, setCoinList }) => {

  const handleCoinClick = (value) => {
    setTotalCoins((prevTotalCoins) => prevTotalCoins + value);
    setCoinList((prevCoinList) => [...prevCoinList, value]);

    if(value < 100){
      toast(`Introduziu a moeda de ${value} cent!`, { autoClose: 1500 });
      console.log(`Introduziu a moeda de ${value} cent!`);
    } else {
      toast(`Introduziu a moeda de ${value / 100} EUR!`, { autoClose: 1500 });
      console.log(`Introduziu a moeda de ${value / 100} EUR!`);
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
