import React, { useEffect, useState } from "react";
import axios from "axios";
import defaultCoins from "./defaultCoins";

const CoinBox = () => {
  const [coinsBox, setCoinsBox] = useState([]);

  useEffect(() => {
    // Função assíncrona para obter os dados do moedeiro da API
    const fetchCoinsBox = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7280/Coins/GetCoinsBox"
        );
        setCoinsBox(response.data || defaultCoins);
      } catch (error) {
        console.error(error);
      }
    };

    // Chamar a função para obter os dados do moedeiro ao montar o componente
    fetchCoinsBox();
  }, []);

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
          {coinsBox.sort((a, b) => b.moeda - a.moeda).map((coin) => {
            if (coin.moeda >= 100) {
              return (
                <tr key={coin.moeda}>
                  <td>{coin.moeda / 100} EUR</td>
                  <td>{coin.quantidade}</td>
                  <td>
                    {((coin.moeda / 100) * coin.quantidade).toFixed(2)} EUR
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={coin.moeda}>
                  <td>{coin.moeda} cent</td>
                  <td>{coin.quantidade}</td>
                  <td>
                    {((coin.moeda / 100) * coin.quantidade).toFixed(2)} EUR
                  </td>
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
