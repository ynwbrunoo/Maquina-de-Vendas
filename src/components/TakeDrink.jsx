import { toast } from "react-toastify";
import { logAndStore } from "./log";

const TakeDrink = ({takeDrink, setTakeDrink}) => {

    const getCurrentTime = () => {
        const date = new Date();
        const options = {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        };
        return `${date.toLocaleDateString("pt-PT", options)}`;
      };

      const handleRetirar = (drink, image) => {
        // Filtra o array de bebidas, removendo a bebida com a imagem que foi clicada
        const updatedDrinks = takeDrink.filter((drink) => drink.image != image);
      
        // Atualiza o estado para refletir o array de bebidas atualizado
        setTakeDrink(updatedDrinks);
      
        logAndStore(
          `Retirou a ${drink.name} - ${getCurrentTime()}`
        );
        toast.success(`Retirou a ${drink.name}, Obrigado Volte Sempre!`, {
          autoClose: 3000,
        });
      }

    return (
        <div className='TakeDrink'>
          {takeDrink.map((drink) => (
            drink.image != null ? (
              <img
                key={drink.image}
                onClick={() => handleRetirar(drink.image)}
                className="retirarBebida"
                src={drink.image}
                alt="Retirar Bebida"
              />
            ) : null
          ))}
        </div>
      );
      
};

export default TakeDrink;
