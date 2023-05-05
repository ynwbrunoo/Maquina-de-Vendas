import CoinBox from "./CoinBox";
import Coins from "./Coins";
import Machine from "./Machine";

const VendingMachine = () => {
  return (
    <div>
      <CoinBox />
      <Machine />
      <Coins />
    </div>
  );
};

export default VendingMachine;
