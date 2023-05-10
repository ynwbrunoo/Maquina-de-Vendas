import CoinBox from "./CoinBox";
import { useState } from "react";
import Coins from "./Coins";
import Info from "./Info";
import Machine from "./Machine";

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
