import { useState, useEffect } from "react";
import drinks from "./drinks";
import coinsBox from "./coinsBox";
import { toast } from 'react-toastify';
import { logAndStore } from './log';

const Info = ({ total, selectedDrink, setSelectedDrink, setTotalCoins, coinList }) => {
  const [faltaPagar, setFaltaPagar] = useState();

  useEffect(() => {
    if (selectedDrink) {
      setFaltaPagar(selectedDrink.price - parseInt(total) / 100);
    } else {
      setFaltaPagar();
    }
  }, [selectedDrink, total]);

  const retirarQuant = () => {
    drinks.forEach((drink) => {
      if (selectedDrink && selectedDrink.name === drink.name) {
        if (selectedDrink.quant !== 0) {
          drink.quant = selectedDrink.quant - 1;
        }
      }
    });
  }

  const troco = () => {
    coinsBox.forEach((coin, index) => {
      if (Math.round(((total / 100) - selectedDrink.price) * 100) / 100 >= (coinsBox[index].moeda / 100)) {
        if(coin.moeda === coinsBox[index].moeda) {
          coinsBox[index].quantidade = coin.quantidade - 1;
          coinsBox[index].valorTotal = (coin.moeda * coin.quantidade) / 100;
          total = total - coinsBox[index].moeda;
        }
      }
    });
  }

  const addMoney = () => {
    coinList.forEach((coin1, index1) => {
      coinsBox.forEach((coin2, index2) => {
        if(coinList[index1] === coinsBox[index2].moeda) {
          coinsBox[index2].quantidade = coin2.quantidade + 1;
          coinsBox[index2].valorTotal = (coin2.moeda * coin2.quantidade) / 100;
        }
      });
    });
    for (let i = 0; i < coinList.length; i++) {
      coinList[i] = 0;
    }
  }

  const getCurrentTime = () => {
    const date = new Date();
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return `${date.toLocaleDateString('pt-PT', options)}`;
  }; 
  

  const handlePagar = () => {
    if (selectedDrink === null){
      toast.error(`Selecione uma bebida!`, { autoClose: 3000 });
      console.log(`Selecione uma bebida!`);
    } else if (selectedDrink.quant === 0) {
      logAndStore(`Já não há mais ${selectedDrink.name} - ${getCurrentTime()}`);
      toast.error(`Já não há mais ${selectedDrink.name}. Espere até a máquina ser reabastecida!`, { autoClose: 3500 });
    } else if (total / 100 === selectedDrink.price) {
      logAndStore(`Comprou uma ${selectedDrink.name} (${selectedDrink.price} EUR) - ${getCurrentTime()}`);
      toast.success(`Comprou uma ${selectedDrink.name} com sucesso!`, { autoClose: 3000 });
      retirarQuant();
      setSelectedDrink(null);
      setTotalCoins(0);
      addMoney();
    } else if (total / 100 > selectedDrink.price) {
      logAndStore(`Comprou uma ${selectedDrink.name} (${selectedDrink.price} EUR) com ${total / 100} EUR e recebeu troco de ${Math.round((total / 100 - selectedDrink.price) * 100) / 100} EUR! - ${getCurrentTime()}`);
      toast.success(`Comprou uma ${selectedDrink.name} com sucesso! Retire o seu Troco de ${Math.round((total / 100 - selectedDrink.price) * 100) / 100} EUR!`, { autoClose: 4000 });
      troco();
      retirarQuant();
      setSelectedDrink(null);
      setTotalCoins(0);
      addMoney();
    } else if (total / 100 < selectedDrink.price) {
      toast.warn(`Falta ${Math.round(faltaPagar * 100) / 100} EUR para comprar uma ${selectedDrink.name}!`, { autoClose: 4000 });
      console.log(`Falta ${Math.round(faltaPagar * 100) / 100} EUR para comprar uma ${selectedDrink.name}!`);
    }
  };

  const handleDevolver = () => {
    if(total / 100 !== 0) {
      logAndStore(`Retirou o(s) seu(s) ${total / 100} EUR - ${getCurrentTime()}`);
      toast.info(`Retire o(s) seu(s) ${total / 100} EUR!`, { autoClose: 3000 });
      setTotalCoins(0);
      setSelectedDrink(null);
    }
  }

  return (
    <div className="info">
      <div className="title">
        <h2>Estado Actual</h2>
      </div>
      <div className="tabbtn">
        <div className="valor">
          <div className="tabela">
            <table>
              <tbody>
                <tr>
                  <th>Valor a pagar:</th>
                  <td>{selectedDrink ? `${selectedDrink.price}` : "0"} EUR</td>
                </tr>
                <tr>
                  <th>Valor introduzido:</th>
                  <td>{total / 100} EUR</td>
                </tr>
                <tr>
                  <th>Falta pagar:</th>
                  <td> {faltaPagar > 0 ? `${Math.round(faltaPagar * 100) / 100}` : "0"} EUR </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="buttons">
          <div className="pagar">
            <button onClick={handlePagar}>Pagar</button>
          </div>
          <div className="devolver">
            <button onClick={handleDevolver}>Devolver o Dinheiro</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;