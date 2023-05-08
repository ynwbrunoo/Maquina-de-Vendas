import React from "react";

const Drink = ({ drink, onClick }) => {

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="bebida"
      onClick={() => {
        onClick(drink);
      }}
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
