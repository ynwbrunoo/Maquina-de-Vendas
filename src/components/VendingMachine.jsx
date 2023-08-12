import CoinBox from "./CoinBox";
import { useState } from "react";
import Coins from "./Coins";
import Info from "./Info";
import Machine from "./Machine";
import TakeDrink from "./TakeDrink";
import Log from "./Log.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Analytics from "./Analytics.jsx";

const VendingMachine = () => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [coinList, setCoinList] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [coinsBox, setCoinsBox] = useState([]);
  const [takeDrink, setTakeDrink] = useState([]);

  return (
    <div className="machine">
      <div className="left">
        <Machine
          setSelectedDrink={setSelectedDrink}
          selectedDrink={selectedDrink}
          totalCoins={totalCoins}
          drinks={drinks}
          setDrinks={setDrinks}
        />
        <TakeDrink takeDrink={takeDrink} setTakeDrink={setTakeDrink} />
      </div>
      <div className="right">
        <ToastContainer />
        <Coins
          setTotalCoins={setTotalCoins}
          setCoinList={setCoinList}
          coinsBox={coinsBox}
          setCoinsBox={setCoinsBox}
        />
        <Info
          total={totalCoins}
          selectedDrink={selectedDrink}
          setSelectedDrink={setSelectedDrink}
          setTotalCoins={setTotalCoins}
          coinList={coinList}
          setCoinList={setCoinList}
          drinks={drinks}
          setDrinks={setDrinks}
          coinsBox={coinsBox}
          setCoinsBox={setCoinsBox}
          takeDrink={takeDrink}
          setTakeDrink={setTakeDrink}
        />
        <CoinBox coinsBox={coinsBox} setCoinsBox={setCoinsBox} />
        <div className="logbtns">
          <Log />
          <Analytics />
        </div>
      </div>
    </div>
  );
};

export default VendingMachine;
