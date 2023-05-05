import { useState } from "react";

const Coin = () => {
  // eslint-disable-next-line no-unused-vars
  const [moeda, _] = useState(20);

  return (
    <div className="coinbox">
      <div className="title">
        <h2>Introduza moedas:</h2>
      </div>
      <div className="moedas">
        <button>{moeda} cent</button>
      </div>
    </div>
  );
};

export default Coin;