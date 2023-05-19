import { useState, useEffect } from "react";
import defaultDrinks from "./defaultDrinks";
import defaultCoins from "./defaultCoins";
import { toast } from "react-toastify";
import { logAndStore } from "./log";
import { StoreMesAnalytics } from "./analyticsMes";
import { StoreAnoAnalytics } from "./analyticsAno";
import { StoreDiaAnalytics } from "./analyticsDia";

const Info = ({
  total,
  selectedDrink,
  setSelectedDrink,
  setTotalCoins,
  coinList,
}) => {
  const [faltaPagar, setFaltaPagar] = useState();

  const storedDrinks = localStorage.getItem("drinks");

  // se o objeto de moedas existir, use-o. Se não, use o objeto de moedas padrão.
  const drinks = storedDrinks ? JSON.parse(storedDrinks) : defaultDrinks;

  const updateDrinksInLocalStorage = () => {
    localStorage.setItem("drinks", JSON.stringify(drinks));
  };

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
          updateDrinksInLocalStorage();
        }
      }
    });
  };

  const storedCoins = localStorage.getItem("coinsBox");

  const coinsBox = storedCoins ? JSON.parse(storedCoins) : defaultCoins;

  const updateCoinsBoxInLocalStorage = () => {
    localStorage.setItem("coinsBox", JSON.stringify(coinsBox));
  };

  const troco = () => {
    coinsBox.forEach((coin, index) => {
      if (
        (total / 100 - selectedDrink.price).toFixed(2) >=
        coinsBox[index].moeda / 100
      ) {
        if (coin.moeda === coinsBox[index].moeda) {
          coinsBox[index].quantidade = coin.quantidade - 1;
          coinsBox[index].valorTotal = (coin.moeda * coin.quantidade) / 100;
          total = total - coinsBox[index].moeda;
          updateCoinsBoxInLocalStorage();
        }
      }
    });
  };

  const storedDadosDiaMessages = localStorage.getItem("dadosDiaMessages");

  const dadosDiaMessages = storedDadosDiaMessages
    ? JSON.parse(storedDadosDiaMessages)
    : null;

  const updateDadosDiaInLocalStorage = () => {
    localStorage.setItem("dadosDiaMessages", JSON.stringify(dadosDiaMessages));
  };

  const storedDadosMesMessages = localStorage.getItem("dadosMesMessages");

  const dadosMesMessages = storedDadosMesMessages
    ? JSON.parse(storedDadosMesMessages)
    : null;

  const updateDadosMesInLocalStorage = () => {
    localStorage.setItem("dadosMesMessages", JSON.stringify(dadosMesMessages));
  };

  const storedDadosAnoMessages = localStorage.getItem("dadosAnoMessages");

  const dadosAnoMessages = storedDadosAnoMessages
    ? JSON.parse(storedDadosAnoMessages)
    : null;

  const updateDadosAnoInLocalStorage = () => {
    localStorage.setItem("dadosAnoMessages", JSON.stringify(dadosAnoMessages));
  };

  const analytics = (price) => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();

    if (dadosDiaMessages !== null) {
      dadosDiaMessages.forEach((dadoDia) => {
        if (dadoDia.hour === hour && dadoDia.day === day && dadoDia.month === month && dadoDia.year === year) {
          dadoDia.price = dadoDia.price + selectedDrink.price;
          updateDadosDiaInLocalStorage();
          return;
        } 
        if (dadoDia.hour !== hour && dadoDia.day !== day && dadoDia.month !== month && dadoDia.year !== year) {
          StoreDiaAnalytics([
            {
              hour: hour,
              day: day,
              price: price,
              month: month,
              year: year,
            },
          ]);
          return;
        }
      });
    } else {
      StoreDiaAnalytics([
        {
          hour: hour,
          day: day,
          price: price,
          month: month,
          year: year,
        },
      ]);
    }

    if (dadosMesMessages !== null) {
      dadosMesMessages.forEach((dadoMes) => {
        if (dadoMes.day === day && dadoMes.month === month && dadoMes.year === year) {
          dadoMes.price = dadoMes.price + selectedDrink.price;
          updateDadosMesInLocalStorage();
          return;
        }
        if (dadoMes.day !== day && dadoMes.month !== month && dadoMes.year !== year) {
          StoreMesAnalytics([
            {
              day: day,
              price: price,
              month: month,
              year: year,
            },
          ]);
          return;
        }
      });
    } else {
      StoreMesAnalytics([
        {
          day: day,
          price: price,
          month: month,
          year: year,
        },
      ]);
    }

    if (dadosAnoMessages !== null) {
      dadosAnoMessages.forEach((dadoAno) => {
        if (dadoAno.month === month && dadoAno.Year === year) {
          dadoAno.price = dadoAno.price + selectedDrink.price;
          updateDadosAnoInLocalStorage();
          return;
        } 
        if (dadoAno.month !== month && dadoAno.Year !== year) {
          StoreAnoAnalytics([
            {
              price: price,
              month: month,
              year: year,
            },
          ]);
          return;
        }
      });
    } else {
      StoreAnoAnalytics([
        {
          price: price,
          month: month,
          year: year,
        },
      ]);
    }
  };

  const addMoney = () => {
    coinList.forEach((coin1, index1) => {
      coinsBox.forEach((coin2, index2) => {
        if (coinList[index1] === coinsBox[index2].moeda) {
          coinsBox[index2].quantidade = coin2.quantidade + 1;
          coinsBox[index2].valorTotal = (coin2.moeda * coin2.quantidade) / 100;
          updateCoinsBoxInLocalStorage();
        }
      });
    });
    for (let i = 0; i < coinList.length; i++) {
      coinList[i] = 0;
    }
  };

  const getCurrentTime = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return `${date.toLocaleDateString("pt-PT", options)}`;
  };

  const handlePagar = () => {
    if (selectedDrink === null) {
      toast.error(`Selecione uma bebida!`, { autoClose: 3000 });
      console.log(`Selecione uma bebida!`);
    } else if (selectedDrink.quant === 0) {
      logAndStore(`Já não há mais ${selectedDrink.name} - ${getCurrentTime()}`);
      toast.error(
        `Já não há mais ${selectedDrink.name}. Espere até a máquina ser reabastecida!`,
        { autoClose: 3500 }
      );
    } else if (total / 100 === selectedDrink.price) {
      logAndStore(
        `Comprou uma ${selectedDrink.name} (${
          selectedDrink.price
        } EUR) - ${getCurrentTime()}`
      );
      toast.success(`Comprou uma ${selectedDrink.name} com sucesso!`, {
        autoClose: 3000,
      });
      analytics(selectedDrink.price);
      retirarQuant();
      setSelectedDrink(null);
      setTotalCoins(0);
      addMoney();
    } else if (total / 100 > selectedDrink.price) {
      logAndStore(
        `Comprou uma ${selectedDrink.name} (${selectedDrink.price} EUR) com ${
          total / 100
        } EUR e recebeu troco de ${(total / 100 - selectedDrink.price).toFixed(
          2
        )} EUR! - ${getCurrentTime()}`
      );
      toast.success(
        `Comprou uma ${
          selectedDrink.name
        } com sucesso! Retire o seu Troco de ${(
          total / 100 -
          selectedDrink.price
        ).toFixed(2)} EUR!`,
        { autoClose: 4000 }
      );
      analytics(selectedDrink.price);
      troco();
      retirarQuant();
      setSelectedDrink(null);
      setTotalCoins(0);
      addMoney();
    } else if (total / 100 < selectedDrink.price) {
      toast.warn(
        `Falta ${((faltaPagar * 100) / 100).toFixed(2)} EUR para comprar uma ${
          selectedDrink.name
        }!`,
        { autoClose: 4000 }
      );
      console.log(
        `Falta ${((faltaPagar * 100) / 100).toFixed(2)} EUR para comprar uma ${
          selectedDrink.name
        }!`
      );
    }
  };

  const handleDevolver = () => {
    if (total / 100 !== 0) {
      logAndStore(
        `Retirou o(s) seu(s) ${(total / 100).toFixed(
          2
        )} EUR - ${getCurrentTime()}`
      );
      toast.info(`Retire o(s) seu(s) ${(total / 100).toFixed(2)} EUR!`, {
        autoClose: 3000,
      });
      setTotalCoins(0);
      setSelectedDrink(null);
    }
  };

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
                  <td>
                    {selectedDrink ? `${selectedDrink.price.toFixed(2)}` : "0"}{" "}
                    EUR
                  </td>
                </tr>
                <tr>
                  <th>Valor introduzido:</th>
                  <td>
                    {total / 100 > 0 ? `${(total / 100).toFixed(2)}` : "0"} EUR
                  </td>
                </tr>
                <tr>
                  <th>Falta pagar:</th>
                  <td>
                    {" "}
                    {faltaPagar > 0
                      ? `${((faltaPagar * 100) / 100).toFixed(2)}`
                      : "0"}{" "}
                    EUR{" "}
                  </td>
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
