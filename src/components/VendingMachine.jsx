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
      <div className="left">
        <Machine setSelectedDrink={setSelectedDrink} />
      </div>
      <div className="right">
        <Coins setTotalCoins={setTotalCoins} />
        <Info
          total={totalCoins}
          selectedDrink={selectedDrink}
          setSelectedDrink={setSelectedDrink}
          setTotalCoins={setTotalCoins}
          setQuant={setQuant}
        />
        <CoinBox quant={quant} />
      </div>
    </div>
  );
};

export default VendingMachine;
