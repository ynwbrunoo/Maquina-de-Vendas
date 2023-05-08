import CoinBox from "./CoinBox";
import { useState } from "react";
import Coins from "./Coins";
import Info from "./Info";
import Machine from "./Machine";

const VendingMachine = () => {
  const [totalCoins, setTotalCoins] = useState(0);
  const [quant, setQuant] = useState(50);
  const [selectedDrink, setSelectedDrink] = useState(null);

  return (
    <div className="machine">
      <CoinBox quant={quant}/>
      <Machine setSelectedDrink={setSelectedDrink}/>
      <Coins setTotalCoins={setTotalCoins} setQuant={setQuant} />
      <Info total={totalCoins} selectedDrink={selectedDrink}/>
    </div>
  );
};

export default VendingMachine;
