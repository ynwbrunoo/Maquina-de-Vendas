import React from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import defaultDrinks from "./defaultDrinks";

const Drink = ({ drink, onClick, totalCoins }) => {
  // verificar se o objeto de moedas existe no localStorage
  const storedDrinks = localStorage.getItem("drinks");

  // se o objeto de moedas existir, use-o. Se não, use o objeto de moedas padrão.
  const drinks = storedDrinks ? JSON.parse(storedDrinks) : defaultDrinks;

  // armazenar o objeto de moedas no localStorage se ele não existir
  if (!storedDrinks) {
    localStorage.setItem("drinks", JSON.stringify(defaultDrinks));
  }

  useEffect(() => {
    drinks.forEach((d) => {
      if (totalCoins / 100 >= d.price) {
        document.getElementById(d.name).style.backgroundColor = "#222222";
        document.getElementById(d.name).style.cursor = "pointer";
      } else {
        document.getElementById(d.name).style.backgroundColor = "#757575";
        document.getElementById(d.name).style.cursor = "not-allowed";
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCoins]);

  const handleOnClick = (drink) => {
    if (
      document.getElementById(drink.name).getAttribute("data-selected") ===
      "true"
    ) {
      return;
    }

    if (totalCoins / 100 < drink.price) {
      toast.error(
        `Insira o dinheiro primeiro para comprar uma ${drink.name} (${drink.price} EUR)!`,
        { autoClose: 2000 }
      );
      document.getElementById(drink.name).style.backgroundColor = "#757575";
      document.getElementById(drink.name).removeAttribute("data-selected");
      return;
    }

    onClick(drink);

    toast.info(`Selecionou a bebida ${drink.name}!`, { autoClose: 2000 });

    if (totalCoins / 100 < drink.price) {
      document.getElementById(drink.name).style.backgroundColor = "#757575";
    } else {
      document.getElementById(drink.name).style.backgroundColor = "#000000";
    }

    drinks.forEach((d) => {
      if (d.name !== drink.name) {
        if (totalCoins / 100 < d.price) {
          document.getElementById(d.name).style.backgroundColor = "#757575";
        } else {
          document.getElementById(d.name).style.backgroundColor = "#222222";
        }
        document.getElementById(d.name).removeAttribute("data-selected");
      }
    });

    document.getElementById(drink.name).setAttribute("data-selected", "true");
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={`bebida`}
      id={drink.name}
      onClick={() => handleOnClick(drink)}
    >
      <div className="name">
        <h2>{drink.name}</h2>
      </div>
      <div className="image">
        <img src={drink.image} alt={drink.name} />
      </div>
      <div className="price">
        <h3>{(drink.price).toFixed(2)} €</h3>
      </div>
      <div className="quant">
      {drink.quant === 0 ? (
        <p style={{color: 'red'}}>Esgotado</p>
      ) : (
        <p>Quantidade: {drink.quant}</p>
      )}
      </div>
    </div>
  );
};

export default Drink;
