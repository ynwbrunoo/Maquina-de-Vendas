import CoinBox from "./CoinBox";
import { useState } from "react";
import Coins from "./Coins";
import Info from "./Info";
import Machine from "./Machine";
import Log from "./Log.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Analytics from "./Analytics.jsx";

const VendingMachine = () => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [coinList, setCoinList] = useState([]);

  return (
    <div className="machine">
      <div className="left">
        <Machine
          setSelectedDrink={setSelectedDrink}
          selectedDrink={selectedDrink}
          totalCoins={totalCoins}
        />
      </div>
      <div className="right">
        <ToastContainer />
        <Coins
          setTotalCoins={setTotalCoins}
          setCoinList={setCoinList}
        />
        <Info
          total={totalCoins}
          selectedDrink={selectedDrink}
          setSelectedDrink={setSelectedDrink}
          setTotalCoins={setTotalCoins}
          coinList={coinList}
        />
        <CoinBox />
        <div className="logbtns">
          <Log />
          <Analytics />
        </div>
      </div>
    </div>
  );
};

export default VendingMachine;
