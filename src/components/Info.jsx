import { useState, useEffect } from "react";
import drinks from "./drinks";
import coinsBox from "./coinsBox";

const Info = ({ total, selectedDrink, setSelectedDrink, setTotalCoins }) => {
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
          coinsBox[index].valorTotal = coin.moeda * coin.quantidade / 100;
          total = total - coinsBox[index].moeda;
        }
      }
    });
  }

  const handlePagar = () => {
    if (selectedDrink.quant === 0) {
      alert("Já não há mais " + selectedDrink.name + ". Espere até a máquina ser reabastecida!");
    } else if (total / 100 === selectedDrink.price) {
      alert("Comprou uma " + selectedDrink.name + " com sucesso.");
      retirarQuant();
      setSelectedDrink(null);
      setTotalCoins(0);
    } else if (total / 100 > selectedDrink.price) {
      alert("Comprou uma " + selectedDrink.name + " com sucesso. Tome o seu Troco de " + `${Math.round((total / 100 - selectedDrink.price) * 100) / 100}` + " EUR!");
      troco();
      retirarQuant();
      setSelectedDrink(null);
      setTotalCoins(0);
    } else if (total / 100 < selectedDrink.price) {
      alert("Falta " + `${Math.round(faltaPagar * 100) / 100}` + " EUR para comprar uma " + selectedDrink.name + ".");
    } else if (Math.round(faltaPagar * 100) / 100 === null) {
      alert("Selecione uma bebida!");
    }
  };

  const handleDevolver = () => {
    if(total / 100 !== 0) {
      alert("Retire os seus " + total / 100 + " EUR!")
      setTotalCoins(0);
    }
  }

  return (
    <div className="info">
      <div className="title">
        <h2>Estado Actual:</h2>
      </div>
      <div className="valor">
        <div className="tabela">
          <table>
            <tbody>
              <tr>
                <th>Valor a pagar:</th>
                <td>{selectedDrink ? `${selectedDrink.price}` : "0"} EUR</td>
              </tr>
              <tr>
                <th>Valor introduzido até agora:</th>
                <td>{total / 100} EUR</td>
              </tr>
              <tr>
                <th>Falta pagar:</th>
                <td> {faltaPagar > 0 ? `${Math.round(faltaPagar * 100) / 100}` : "0"}{" "} EUR </td>
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
  );
};

export default Info;