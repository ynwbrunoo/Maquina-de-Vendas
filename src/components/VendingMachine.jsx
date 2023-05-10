import CoinBox from "./CoinBox";
import { useState } from "react";
import Coins from "./Coins";
import Info from "./Info";
import Machine from "./Machine";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VendingMachine = () => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [selectedDrink, setSelectedDrink] = useState(null);
  const [coinsInserted, setCoinsInserted] = useState({});

  return (
    <div className="machine">
      <div className="left">
        <Machine setSelectedDrink={setSelectedDrink} />
      </div>
      <div className="right">
        <ToastContainer />
        <Coins setTotalCoins={setTotalCoins} setCoinsInserted={setCoinsInserted} />
        <Info
          total={totalCoins}
          selectedDrink={selectedDrink}
          setSelectedDrink={setSelectedDrink}
          setTotalCoins={setTotalCoins}
        />
        <CoinBox coinsInserted={coinsInserted} />
      </div>
    </div>
  );
};

export default VendingMachine;
