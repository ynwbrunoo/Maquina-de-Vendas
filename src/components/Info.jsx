import defaultDrinks from "./defaultDrinks";
import { toast } from "react-toastify";
import { logAndStore } from "./log";
import { StoreMesAnalytics } from "./analyticsMes";
import { StoreAnoAnalytics } from "./analyticsAno";
import { StoreDiaAnalytics } from "./analyticsDia";
import axios from "axios";
import { useState } from "react";

const Info = ({
  total,
  selectedDrink,
  setSelectedDrink,
  setTotalCoins,
  coinList,
  setCoinList
}) => {

  const storedDrinks = localStorage.getItem("drinks");

  // se o objeto de moedas existir, use-o. Se não, use o objeto de moedas padrão.
  const drinks = storedDrinks ? JSON.parse(storedDrinks) : defaultDrinks;

  const updateDrinksInLocalStorage = () => {
    localStorage.setItem("drinks", JSON.stringify(drinks));
  };

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

  const [coinsBox, setCoinsBox] = useState([]);

  const troco = async () => {
    const updatedCoinsBox = coinsBox.map((coin) => {
      if (
        (total / 100 - selectedDrink.price).toFixed(2) >= coin.moeda / 100
      ) {
        const updatedQuantidade = coin.quantidade - 1;
        const updatedValorTotal = (coin.moeda * updatedQuantidade) / 100;

        return { ...coin, quantidade: updatedQuantidade, valorTotal: updatedValorTotal };
      }
      return coin;
    });

    try {
      await axios.post("https://localhost:7280/Coins/PostCoinsBox", updatedCoinsBox);

      setCoinsBox(updatedCoinsBox);
    } catch (error) {
      console.error(error);
    }
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
    let bool = false;

    if (dadosDiaMessages !== null) {
      bool = false;
      dadosDiaMessages.forEach((dadoDia) => {
        if (dadoDia.hour === hour && dadoDia.day === now.getDate() && dadoDia.month === now.getMonth() + 1 && dadoDia.year === now.getFullYear()) {
          dadoDia.price = Number(dadoDia.price);
          dadoDia.price += selectedDrink.price;
          dadoDia.price = (dadoDia.price).toFixed(2);
          updateDadosDiaInLocalStorage();
          bool = true;
        } 
        if (bool === false) {
          StoreDiaAnalytics([
            {
              hour: hour,
              day: day,
              price: price,
              month: month,
              year: year,
            },
          ]);
          bool = true;
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
      bool = false;
      dadosMesMessages.forEach((dadoMes) => {
        if (dadoMes.day === now.getDate() && dadoMes.month === now.getMonth() + 1 && dadoMes.year === now.getFullYear()) {
          dadoMes.price = Number(dadoMes.price);
          dadoMes.price += selectedDrink.price;
          dadoMes.price = (dadoMes.price).toFixed(2);
          updateDadosMesInLocalStorage();
          bool = true;
        } 
        if (bool === false) {
          StoreMesAnalytics([
            {
              day: day,
              price: price,
              month: month,
              year: year,
            },
          ]);
          bool = true;
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
      bool = false;
      dadosAnoMessages.forEach((dadoAno) => {
        if (dadoAno.month === now.getMonth() + 1 && dadoAno.year === now.getFullYear()) {
          dadoAno.price = Number(dadoAno.price);
          dadoAno.price += selectedDrink.price;
          dadoAno.price = (dadoAno.price).toFixed(2);
          updateDadosAnoInLocalStorage();
          bool = true;
        } 
        if(bool === false) {
          StoreAnoAnalytics([
            {
              price: price,
              month: month,
              year: year,
            },
          ]);
          bool = true;
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

  const addMoney = async () => {
    try {
      const updatedCoinsBoxList = coinsBox.map((coin) => {
        const foundCoin = coinList.find((c) => c === coin.moeda);
  
        const updatedQuantidade = foundCoin ? coin.quantidade + 1 : coin.quantidade;
        const updatedValorTotal = (coin.moeda * updatedQuantidade) / 100;
  
        return { ...coin, quantidade: updatedQuantidade, valorTotal: updatedValorTotal };
      });
  
      console.log("Updated CoinsBoxList:", updatedCoinsBoxList);
  
      await axios.post("https://localhost:7280/Coins/PostCoinsBox", updatedCoinsBoxList);
  
      setCoinsBox(updatedCoinsBoxList);
      setCoinList(new Array(coinList.length).fill(0));
    } catch (error) {
      console.error(error);
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
