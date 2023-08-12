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

    const handleRetirar = () => {
        setTakeDrink(null);
        logAndStore(
            `Retirou a bebida X - ${getCurrentTime()}`
          );
          toast.success(`Retirou a bebida X, Obrigado Volte Sempre!`, {
            autoClose: 3000,
          });
    }

    return (
        <div className='TakeDrink'>
          {takeDrink.map((drink) => (
            drink.image != null ? (
              <img
                key={drink.image} // Use um valor adequado como chave, preferencialmente um ID exclusivo
                onClick={() => handleRetirar(drink.image)} // Supondo que handleRetirar espera um URL de imagem
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
