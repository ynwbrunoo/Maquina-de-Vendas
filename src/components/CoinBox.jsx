import coinsBox from "./coinsBox";

const CoinBox = () => {
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
          {coinsBox.map((coin) => {
            if (coin.moeda >= 100) {
              return (
                <tr key={coin.moeda}>
                  <td>{coin.moeda / 100} EUR</td>
                  <td>{coin.quantidade}</td>
                  <td>{coin.valorTotal} EUR</td>
                </tr>
              );
            } else {
              return (
                <tr key={coin.moeda}>
                  <td>{coin.moeda} cent</td>
                  <td>{coin.quantidade}</td>
                  <td>{coin.valorTotal} EUR</td>
                </tr>
              );
            }
          })}
        </table>
      </div>
      <div className="log">
        <button><img src="https://www.seekpng.com/png/full/781-7815113_history-icon-white-png.png" alt="Histórico" /> Histórico</button>
      </div>
    </div>
  );
};

export default CoinBox;
