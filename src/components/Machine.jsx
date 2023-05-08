import drinks from "./drinks";
import Drink from "./Drink";

const Machine = ({setSelectedDrink}) => {
  const handleDrinkClick = (drink) => {
    setSelectedDrink(drink);
  };

  return (
    <div className="machine">
      <div className="title">
        <h2>Máquina de Venda</h2>
      </div>
      <div className="bebidas">
        {drinks.map((drink) => (
          <Drink key={drink.name} drink={drink} onClick={handleDrinkClick}/>
        ))}
      </div>
    </div>
  );
};

export default Machine;

