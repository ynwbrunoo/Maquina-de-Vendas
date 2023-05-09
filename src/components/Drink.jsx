import React from "react";
import { useState } from "react";

const Drink = ({ drink, onClick }) => {

  const [selectedDrink, setSelectedDrink] = useState(null);

  const handleOnClick = (drink) => {
    onClick(drink);
    setSelectedDrink(drink.name);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
    className={`bebida ${
      selectedDrink === drink.name ? "selected" : ""
    } ${
      selectedDrink === "Coca Cola" && drink.name === "Sprite"
        ? "coca-cola-selected"
        : ""
    } ${
      selectedDrink === "Sprite" && drink.name === "Coca Cola"
        ? "sprite-selected"
        : ""
    }`}
    onClick={() => handleOnClick(drink)}
    >
      <div className="name">
        <h2>{drink.name}</h2>
      </div>
      <div className="image">
        <img src={drink.image} alt={drink.name} />
      </div>
      <div className="price">
        <h3>{drink.price} €</h3>
      </div>
      <div className="quant">
        <p>Quantidade: {drink.quant}</p>
      </div>
    </div>
  );
};

export default Drink;
