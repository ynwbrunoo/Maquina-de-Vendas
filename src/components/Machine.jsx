import drinks from "./drinks";

const Machine = () => {
  return (
    <div className="machine">
      <div className="title">
        <h2>Máquina de Venda</h2>
      </div>
      <div className="bebidas">
        {drinks.map((drink) => (
          <div className="bebida" key={drink.name}>
            <div className="name"><h2>{drink.name}</h2></div> 
            <div className="image"><img src={drink.image} alt={drink.name} /></div>
            <div className="price"><h3> {drink.price} €</h3></div>
            <div className="quant"><p>Quantidade: {drink.quant}</p></div> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default Machine;
