import CoinBox from "./CoinBox";
import { useState } from "react";
import Coins from "./Coins";
import Info from "./Info";
import Machine from "./Machine";

const VendingMachine = () => {
  const [totalCoins, setTotalCoins] = useState(0);

  return (
    <div>
      <CoinBox />
      <Machine />
      <Coins setTotalCoins={setTotalCoins} />
      <Info total={totalCoins} />
    </div>
  );
};

export default VendingMachine;
