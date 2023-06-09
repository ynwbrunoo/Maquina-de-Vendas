import defaultDrinks from "./defaultDrinks";
import { toast } from "react-toastify";
import { logAndStore } from "./log";
import axios from "axios";
import { useState, useEffect } from "react";

const Info = ({
  total,
  selectedDrink,
  setSelectedDrink,
  setTotalCoins,
  coinList,
  setCoinList,
  drinks,
  setDrinks,
  coinsBox,
  setCoinsBox,
}) => {
  const retirarQuant = async () => {
    const updatedDrinks = await Promise.all(drinks.map(async (drink) => {
      if (selectedDrink && selectedDrink.name === drink.name) {
        if (selectedDrink.quant !== 0) {
          if (drink.id === selectedDrink.id) {
            let id = selectedDrink.id;
            try {
              await axios.post(
                `https://localhost:7280/Drinks/PostDrinks/${id}`,
                { ...selectedDrink, quant: selectedDrink.quant - 1 }
              );
              return { ...drink, quant: selectedDrink.quant - 1 };
            } catch (error) {
              console.error(error);
              return drink;
            }
          }
        }
      }
      return drink;
    }));
  
    setDrinks(updatedDrinks);
  };
  
  
  
  

  useEffect(() => {
    // Função assíncrona para obter os dados do moedeiro da API
    const fetchDrinks = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7280/Drinks/GetDrinks"
        );
        if (response.data.length <= 0) {
          defaultDrinks.forEach(async (drink) => {
            try {
              await axios.post(
                "https://localhost:7280/Drinks/PostDrinks",
                drink
              );
              console.log("Enviado:", JSON.stringify(drink));
            } catch (error) {
              console.error("Erro ao enviar:", JSON.stringify(drink));
              console.error(error);
            }
          });
        }
        setDrinks(response.data || "");
      } catch (error) {
        console.error(error);
      }
    };

    // Chamar a função para obter os dados do moedeiro ao montar o componente
    fetchDrinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response2 = await axios.get(
          "https://localhost:7280/DadosAnoMessages/GetDadosAnoMessages"
        );
        setDadosAnoMessages(response2.data);

        const response3 = await axios.get(
          "https://localhost:7280/DadosMesMessages/GetDadosMesMessages"
        );
        setDadosMesMessages(response3.data);

        const response4 = await axios.get(
          "https://localhost:7280/DadosDiaMessages/GetDadosDiaMessages"
        );
        setDadosDiaMessages(response4.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchCoinsBox = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7280/Coins/GetCoinsBox"
        );
        setCoinsBox(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCoinsBox();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const troco = async () => {
    const updatedCoinsBox = await Promise.all(coinsBox.map( async (coin) => {
      if ((total / 100 - selectedDrink.price).toFixed(2) >= coin.moeda / 100) {
        const updatedQuantidade = coin.quantidade - 1;
        const updatedValorTotal = (coin.moeda * updatedQuantidade) / 100;
        const id = coin.id;
        total = total - coin.moeda;

        await axios.post(
          `https://localhost:7280/Coins/PostCoinsBox/${id}`,
          { ...coin, quantidade: updatedQuantidade, valorTotal: updatedValorTotal }
        );

        return {
          ...coin,
          quantidade: updatedQuantidade,
          valorTotal: updatedValorTotal,
        };
      }
      return coin;
    }));

    try {
      setCoinsBox(updatedCoinsBox);
    } catch (error) {
      console.error(error);
    }
  };

  const [dadosAnoMessages, setDadosAnoMessages] = useState([]);
  const [dadosMesMessages, setDadosMesMessages] = useState([]);
  const [dadosDiaMessages, setDadosDiaMessages] = useState([]);

  const analytics = async (price) => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();
    let bool = false;

    console.log(dadosDiaMessages);
    console.log(dadosMesMessages);
    console.log(dadosAnoMessages);

    if (dadosDiaMessages.length > 0) {
      bool = false;
      dadosDiaMessages.forEach(async (dadoDia) => {
        if (
          dadoDia.hour === hour &&
          dadoDia.day === now.getDate() &&
          dadoDia.month === now.getMonth() + 1 &&
          dadoDia.year === now.getFullYear()
        ) {
          dadoDia.price = Number(dadoDia.price);
          dadoDia.price += selectedDrink.price;
          dadoDia.price = dadoDia.price.toFixed(2);

          await axios.post(
            `https://localhost:7280/DadosDiaMessages/PostDadosDiaMessages/${dadoDia.id}`,
            {
              hour: dadoDia.hour,
              day: dadoDia.day,
              price: dadoDia.price,
              month: dadoDia.month,
              year: dadoDia.year,
            }
          );

          const response4 = await axios.get(
            "https://localhost:7280/DadosDiaMessages/GetDadosDiaMessages"
          );
          setDadosDiaMessages(response4.data);

          bool = true;
        }
        if (bool === false) {
          await axios.post(
            "https://localhost:7280/DadosDiaMessages/PostDadosDiaMessages",
            [{ hour: hour, day: day, price: price, month: month, year: year }]
          );

          const response4 = await axios.get(
            "https://localhost:7280/DadosDiaMessages/GetDadosDiaMessages"
          );
          setDadosDiaMessages(response4.data);
          bool = true;
        }
      });
    } else {
      await axios.post(
        "https://localhost:7280/DadosDiaMessages/PostDadosDiaMessages",
        [{ hour: hour, day: day, price: price, month: month, year: year }]
      );

      const response4 = await axios.get(
        "https://localhost:7280/DadosDiaMessages/GetDadosDiaMessages"
      );
      setDadosDiaMessages(response4.data);
    }

    if (dadosMesMessages.length > 0) {
      bool = false;
      dadosMesMessages.forEach(async (dadoMes) => {
        if (
          dadoMes.day === now.getDate() &&
          dadoMes.month === now.getMonth() + 1 &&
          dadoMes.year === now.getFullYear()
        ) {
          dadoMes.price = Number(dadoMes.price);
          dadoMes.price += selectedDrink.price;
          dadoMes.price = dadoMes.price.toFixed(2);

          await axios.post(
            `https://localhost:7280/DadosMesMessages/PostDadosMesMessages/${dadoMes.id}`,
            {
              day: dadoMes.day,
              price: dadoMes.price,
              month: dadoMes.month,
              year: dadoMes.year,
            }
          );

          const response3 = await axios.get(
            "https://localhost:7280/DadosMesMessages/GetDadosMesMessages"
          );
          setDadosMesMessages(response3.data);

          bool = true;
        }
        if (bool === false) {
          await axios.post(
            "https://localhost:7280/DadosMesMessages/PostDadosMesMessages",
            [{ day: day, price: price, month: month, year: year }]
          );

          const response3 = await axios.get(
            "https://localhost:7280/DadosMesMessages/GetDadosMesMessages"
          );
          setDadosMesMessages(response3.data);
          bool = true;
        }
      });
    } else {
      await axios.post(
        "https://localhost:7280/DadosMesMessages/PostDadosMesMessages",
        [{ day: day, price: price, month: month, year: year }]
      );

      const response3 = await axios.get(
        "https://localhost:7280/DadosMesMessages/GetDadosMesMessages"
      );
      setDadosMesMessages(response3.data);
    }

    if (dadosAnoMessages.length > 0) {
      bool = false;
      dadosAnoMessages.forEach(async (dadoAno) => {
        if (
          dadoAno.month === now.getMonth() + 1 &&
          dadoAno.year === now.getFullYear()
        ) {
          dadoAno.price = Number(dadoAno.price);
          dadoAno.price += selectedDrink.price;
          dadoAno.price = dadoAno.price.toFixed(2);

          console.log("nigga1");
          await axios.post(
            `https://localhost:7280/DadosAnoMessages/PostDadosAnoMessages/${dadoAno.id}`,
            { price: dadoAno.price, month: dadoAno.month, year: dadoAno.year }
          );

          const response2 = await axios.get(
            "https://localhost:7280/DadosAnoMessages/GetDadosAnoMessages"
          );
          setDadosAnoMessages(response2.data);

          bool = true;
        }
        if (bool === false) {
          await axios.post(
            "https://localhost:7280/DadosAnoMessages/PostDadosAnoMessages",
            [{ price: price, month: month, year: year }]
          );

          const response2 = await axios.get(
            "https://localhost:7280/DadosAnoMessages/GetDadosAnoMessages"
          );
          setDadosAnoMessages(response2.data);
          bool = true;
        }
      });
    } else {
      await axios.post(
        "https://localhost:7280/DadosAnoMessages/PostDadosAnoMessages",
        [{ price: price, month: month, year: year }]
      );

      const response2 = await axios.get(
        "https://localhost:7280/DadosAnoMessages/GetDadosAnoMessages"
      );
      setDadosAnoMessages(response2.data);
    }
  };

  const addMoney = async () => {
    try {
      const updatedCoinsBoxList = coinsBox.map((coin) => {
        const foundCoin = coinList.find((c) => c === coin.moeda);

        const updatedQuantidade = foundCoin
          ? coin.quantidade + 1
          : coin.quantidade;
        const updatedValorTotal = (coin.moeda * updatedQuantidade) / 100;

        return {
          ...coin,
          quantidade: updatedQuantidade,
          valorTotal: updatedValorTotal,
        };
      });

      console.log("Updated CoinsBoxList:", updatedCoinsBoxList);

      await axios.post(
        "https://localhost:7280/Coins/PostCoinsBox",
        updatedCoinsBoxList
      );

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
