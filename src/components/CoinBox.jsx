import coinsBox from "./coinsBox";

const CoinBox = () => {

  return (
    <div className="coinbox">
      <div className="title top">
        <h2>Conteúdo do Moedeiro</h2>
      </div>
      <div className="tabela">
        <table>
          <tr>
            <th>Moeda</th>
            <th>Quantidade</th>
            <th>Valor Total</th>
          </tr>
          {coinsBox.map((coinsBox) => (
            <tr key={coinsBox.moeda}>
              <td>{coinsBox.moeda} cent</td>
              <td>{coinsBox.quantidade}</td>
              <td>{coinsBox.valorTotal} EUR</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default CoinBox;
