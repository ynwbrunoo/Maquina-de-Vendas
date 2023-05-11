import { toast } from 'react-toastify';
import { logAndStore } from './log';

const Coin = ({ setTotalCoins, setCoinList}) => {

  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return `${hours}:${minutes} ${date.toLocaleDateString('pt-BR', options)}`;
  }; 

  const handleCoinClick = (value) => {
    setTotalCoins((prevTotalCoins) => prevTotalCoins + value);
    setCoinList((prevCoinList) => [...prevCoinList, value]);

    if(value < 100){
      toast.info(`Introduziu a moeda de ${value} cent!`, { autoClose: 1500 });
      logAndStore(`Introduziu uma moeda de ${value} cent - ${getCurrentTime()}`);
    } else {
      toast.info(`Introduziu a moeda de ${value / 100} EUR!`, { autoClose: 1500 });
      logAndStore(`Introduziu uma moeda de ${value / 100} EUR - ${getCurrentTime()}`);
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
