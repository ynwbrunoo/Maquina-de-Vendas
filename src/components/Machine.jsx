import drinks from "./drinks";
import Drink from "./Drink";
import { logAndStore } from './log';

const Machine = ({setSelectedDrink, selectedDrink}) => {
  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
    return `${hours}:${minutes} ${date.toLocaleDateString('pt-BR', options)}`;
  }; 

  const handleDrinkClick = (drink) => {
    setSelectedDrink(drink);
    logAndStore(`Selecionou a bebida ${drink.name} - ${getCurrentTime()}`);
  };

  return (
      <div className="bebidas">
        {drinks.map((drink) => (
          <Drink key={drink.name} drink={drink} onClick={handleDrinkClick} selectedDrink={selectedDrink} />
        ))}
      </div>
  );
};

export default Machine;

