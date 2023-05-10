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
  const [coinList, setCoinList] = useState([]);

  return (
    <div className="machine">
      <div className="left">
        <Machine setSelectedDrink={setSelectedDrink} selectedDrink={selectedDrink} />
      </div>
      <div className="right">
        <ToastContainer />
        <Coins setTotalCoins={setTotalCoins} setCoinList={setCoinList}/>
        <Info
          total={totalCoins}
          selectedDrink={selectedDrink}
          setSelectedDrink={setSelectedDrink}
          setTotalCoins={setTotalCoins}
          coinList={coinList}
        />
        <CoinBox/>
      </div>
    </div>
  );
};

export default VendingMachine;
