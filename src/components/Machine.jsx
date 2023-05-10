import drinks from "./drinks";
import Drink from "./Drink";

const Machine = ({setSelectedDrink, selectedDrink}) => {
  const handleDrinkClick = (drink) => {
    setSelectedDrink(drink);
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

