import drinks from "./drinks";
import Drink from "./Drink";
import { logAndStore } from './log';
import { useEffect } from "react";

const Machine = ({setSelectedDrink, selectedDrink, totalCoins}) => {
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

  useEffect(() => {
    if(selectedDrink === null) {
      drinks.forEach((d) => {
        if((totalCoins / 100) < d.price) { 
          document.getElementById(d.name).style.backgroundColor = "#757575";
        } else {
          document.getElementById(d.name).style.backgroundColor = "#222222";
        }
        document.getElementById(d.name).removeAttribute('data-selected');
      });
    }
  }, [selectedDrink]);

  const handleDrinkClick = (drink) => {
    setSelectedDrink(drink);
    logAndStore(`Selecionou a bebida ${drink.name} - ${getCurrentTime()}`);

    setTimeout(() => {
      drinks.forEach((d) => {
        if((totalCoins / 100) < d.price) { 
          document.getElementById(d.name).style.backgroundColor = "#757575";
        } else {
          document.getElementById(d.name).style.backgroundColor = "#222222";
        }
        document.getElementById(d.name).removeAttribute('data-selected');
        setSelectedDrink(null);
      });
    }, 15000);
  };

  return (
      <div className="bebidas">
        {drinks.map((drink) => (
          <Drink key={drink.name} drink={drink} onClick={handleDrinkClick} selectedDrink={selectedDrink} totalCoins={totalCoins} />
        ))}
      </div>
  );
};

export default Machine;

