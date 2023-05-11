import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import drinks from "./drinks";


const Drink = ({ drink, onClick }) => {

  // eslint-disable-next-line no-unused-vars
  const [_, setSelectedDrink] = useState(null);

  const handleOnClick = (drink) => {
    if (document.getElementById(drink.name).getAttribute('data-selected') === 'true') {
      return;
    }
  
    onClick(drink);
  
    toast.info(`Selecionou a bebida ${drink.name}!`, { autoClose: 2000 });
  
    document.getElementById(drink.name).style.backgroundColor = "#000000";
    drinks.forEach((d) => {
      if (d.name !== drink.name) {
        document.getElementById(d.name).style.backgroundColor = "#222222";
        document.getElementById(d.name).removeAttribute('data-selected');
      }
    });
  
    document.getElementById(drink.name).setAttribute('data-selected', 'true');

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
        <h3>{drink.price} €</h3>
      </div>
      <div className="quant">
        <p>Quantidade: {drink.quant}</p>
      </div>
    </div>
  );
};

export default Drink;
