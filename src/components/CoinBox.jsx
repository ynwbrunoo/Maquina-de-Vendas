import { useState, useEffect } from "react";

const CoinBox = ({ quant }) => {
  // eslint-disable-next-line no-unused-vars
  const [moeda, _] = useState(20);
  const [valorTotal, setValorTotal] = useState();

  useEffect(() => {
    setValorTotal(moeda * quant / 100);
  }, [moeda, quant]);

  return (
    <div className="coinbox">
      <div className="title">
        <h2>Conteúdo do Moedeiro</h2>
      </div>
      <div className="tabela">
        <table>
          <tr>
            <th>Moeda</th>
            <th>Quantidade</th>
            <th>Valor Total</th>
          </tr>
          <tr>
            <td>{moeda} cent</td>
            <td>{quant}</td>
            <td>{valorTotal} EUR</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default CoinBox;
