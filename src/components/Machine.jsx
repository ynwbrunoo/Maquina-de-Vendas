import defaultDrinks from "./defaultDrinks";
import Drink from "./Drink";
import { logAndStore } from "./log";
import { useEffect } from "react";

const Machine = ({ setSelectedDrink, selectedDrink, totalCoins }) => {

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

  // verificar se o objeto de moedas existe no localStorage
  const storedDrinks = localStorage.getItem("drinks");

  // se o objeto de moedas existir, use-o. Se não, use o objeto de moedas padrão.
  const drinks = storedDrinks ? JSON.parse(storedDrinks) : defaultDrinks;

  // armazenar o objeto de moedas no localStorage se ele não existir
  if (!storedDrinks) {
    localStorage.setItem("drinks", JSON.stringify(defaultDrinks));
  }

  useEffect(() => {
    if (selectedDrink === null) {
      drinks.forEach((d) => {
        if (totalCoins / 100 < d.price) {
          document.getElementById(d.name).style.backgroundColor = "#757575";
        } else {
          document.getElementById(d.name).style.backgroundColor = "#222222";
        }
        document.getElementById(d.name).removeAttribute("data-selected");
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDrink]);

  let timeoutId;

  const handleDrinkClick = (drink) => {
    clearTimeout(timeoutId);
    setSelectedDrink(drink);
    logAndStore(`Selecionou a bebida ${drink.name} - ${getCurrentTime()}`);

    timeoutId = setTimeout(() => {
      drinks.forEach((d) => {
        if (totalCoins / 100 < d.price) {
          document.getElementById(d.name).style.backgroundColor = "#757575";
        } else {
          document.getElementById(d.name).style.backgroundColor = "#222222";
        }
        document.getElementById(d.name).removeAttribute("data-selected");
      });
      setSelectedDrink(null);
    }, 15000);
  };

  return (
    <div className="bebidas">
      {drinks.map((drink) => (
        <Drink
          key={drink.name}
          drink={drink}
          onClick={handleDrinkClick}
          selectedDrink={selectedDrink}
          totalCoins={totalCoins}
        />
      ))}
    </div>
  );
};

export default Machine;
