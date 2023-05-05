import { useState, useEffect } from "react";

const CoinBox = () => {
  const [moeda, setMoeda] = useState(20);
  const [quantidade, setQuantidade] = useState(50);
  const [valorTotal, setValorTotal] = useState();

  useEffect(() => {
    setValorTotal(moeda * quantidade / 100);
  }, [moeda, quantidade]);

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
            <td>{quantidade}</td>
            <td>{valorTotal} EUR</td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default CoinBox;
