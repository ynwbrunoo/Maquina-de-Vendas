import drinks from "./drinks";
import Drink from "./Drink";

const Machine = ({setSelectedDrink}) => {
  const handleDrinkClick = (drink) => {
    setSelectedDrink(drink);
  };

  return (
      <div className="bebidas">
        {drinks.map((drink) => (
          <Drink key={drink.name} drink={drink} onClick={handleDrinkClick}/>
        ))}
      </div>
  );
};

export default Machine;

