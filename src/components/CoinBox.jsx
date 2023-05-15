import defaultCoins from "./defaultCoins";

const CoinBox = () => {
  // verificar se o objeto de moedas existe no localStorage
  const storedCoins = localStorage.getItem("coinsBox");

  // se o objeto de moedas existir, use-o. Se não, use o objeto de moedas padrão.
  const coinsBox = storedCoins ? JSON.parse(storedCoins) : defaultCoins;

  // armazenar o objeto de moedas no localStorage se ele não existir
  if (!storedCoins) {
    localStorage.setItem("coinsBox", JSON.stringify(defaultCoins));
  }

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
                  <td>{((coin.moeda / 100) * coin.quantidade).toFixed(2)} EUR</td>
                </tr>
              );
            } else {
              return (
                <tr key={coin.moeda}>
                  <td>{coin.moeda} cent</td>
                  <td>{coin.quantidade}</td>
                  <td>{((coin.moeda / 100) * coin.quantidade).toFixed(2)} EUR</td>
                </tr>
              );
            }
          })}
        </table>
      </div>
    </div>
  );
};

export default CoinBox;
