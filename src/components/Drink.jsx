import React from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";

const Drink = ({ drink, onClick, totalCoins }) => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    // Função assíncrona para obter os dados do moedeiro da API
    const fetchDrinks = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7280/Drinks/GetDrinks"
        );
        setDrinks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    // Chamar a função para obter os dados do moedeiro ao montar o componente
    fetchDrinks();
  }, []);

  useEffect(() => {
    drinks.forEach((d) => {
      if (totalCoins / 100 >= d.price) {
        if (d.quant === 0) {
          document.getElementById(d.name).style.backgroundColor = "#757575";
          document.getElementById(d.name).style.cursor = "not-allowed";
        } else {
          document.getElementById(d.name).style.backgroundColor = "#222222";
          document.getElementById(d.name).style.cursor = "pointer";
        }
      } else {
        document.getElementById(d.name).style.backgroundColor = "#757575";
        document.getElementById(d.name).style.cursor = "not-allowed";
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCoins]);

  const handleOnClick = (drink) => {
    if (
      document.getElementById(drink.name).getAttribute("data-selected") ===
      "true"
    ) {
      return;
    }

    if (totalCoins / 100 < drink.price) {
      toast.error(
        `Insira o dinheiro primeiro para comprar uma ${drink.name} (${drink.price} EUR)!`,
        { autoClose: 2000 }
      );
      document.getElementById(drink.name).style.backgroundColor = "#757575";
      document.getElementById(drink.name).removeAttribute("data-selected");
      return;
    }

    if (drink.quant === 0) {
      toast.error(
        `Já não há mais ${drink.name}. Espere até a máquina ser reabastecida!`,
        { autoClose: 2000 }
      );
      document.getElementById(drink.name).style.backgroundColor = "#757575";
      document.getElementById(drink.name).removeAttribute("data-selected");
      return;
    }

    onClick(drink);

    toast.info(`Selecionou a bebida ${drink.name}!`, { autoClose: 2000 });

    if (totalCoins / 100 < drink.price) {
      document.getElementById(drink.name).style.backgroundColor = "#757575";
    } else {
      document.getElementById(drink.name).style.backgroundColor = "#000000";
    }

    drinks.forEach((d) => {
      if (d.name !== drink.name) {
        if (totalCoins / 100 < d.price) {
          document.getElementById(d.name).style.backgroundColor = "#757575";
        } else {
          if (d.quant === 0) {
            document.getElementById(d.name).style.backgroundColor = "#757575";
          } else {
            document.getElementById(d.name).style.backgroundColor = "#222222";
          }
        }
        document.getElementById(d.name).removeAttribute("data-selected");
      }
    });

    document.getElementById(drink.name).setAttribute("data-selected", "true");
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    setIsEditing(false);
    try {
      const name = document.getElementById("editName").value;
      const price = parseFloat(document.getElementById("editPrice").value);
      const quant = parseInt(document.getElementById("editQuant").value);
      const id = drink.id;

      // Enviar a solicitação de atualização para a API
      await axios.post(`https://localhost:7280/Drinks/PostDrinks/${id}`, {
        ...drink,
        name: name,
        price: price,
        quant: quant,
      });

      const fetchDrinks = async () => {
        try {
          const response = await axios.get(
            "https://localhost:7280/Drinks/GetDrinks"
          );
          setDrinks(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchDrinks();
    } catch (error) {
      console.error(error);

    }
  };

  return (
    <div>
      <div
        className={`bebida ${isEditing ? "edit-mode" : ""}`}
        id={drink.name}
        onClick={() => handleOnClick(drink)}
        role="button"
      >
        <div className="name">
          <h2>
            {isEditing ? (
              <input
                className="input-drink h2"
                id="editName"
                type="text"
                defaultValue={drink.name}
              />
            ) : (
              drink.name
            )}
          </h2>
        </div>
        <div className="image">
          <img src={drink.image} alt={drink.name} />
        </div>
        <div className="price">
          <h3>
            {isEditing ? (
              <input
                className="input-drink h3"
                id="editPrice"
                type="text"
                defaultValue={drink.price.toFixed(2)}
              />
            ) : (
              `${drink.price.toFixed(2)}`
            )}
            €
          </h3>
        </div>
        <div className="quant">
          {drink.quant === 0 ? (
            <p style={{ color: "red" }}>
              Quantidade:{" "}
              {isEditing ? (
                <input
                  className="input-drink p"
                  id="editQuant"
                  type="text"
                  defaultValue={drink.quant}
                />
              ) : (
                `Esgotado`
              )}
            </p>
          ) : (
            <p>
              Quantidade:{" "}
              {isEditing ? (
                <input
                  className="input-drink p"
                  id="editQuant"
                  type="text"
                  defaultValue={drink.quant}
                />
              ) : (
                `${drink.quant}`
              )}
            </p>
          )}
        </div>
      </div>
      <div className="edit">
        {isEditing ? (
          <button className="save" onClick={handleSaveClick}>Salvar</button>
        ) : (
          <button className="edit" onClick={handleEditClick}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1038/1038547.png"
              alt="Editar"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Drink;
