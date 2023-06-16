import React from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";

const Drink = ({ drink, onClick, totalCoins, drinks, setDrinks }) => {
  const [showModal, setShowModal] = useState(false);

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

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = async () => {
    if (document.getElementById("editName").value !== "") {
      if (document.getElementById("editPrice").value !== "") {
        if (document.getElementById("editQuant").value !== "") {
          setIsEditing(false);
          try {
            const name = document.getElementById("editName").value;
            const price = parseFloat(
              document.getElementById("editPrice").value
            );
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
        } else {
          toast.error(`A Quantidade não pode ser vazio!`, {
            autoClose: 3500,
          });
        }
      } else {
        toast.error(`O Preço não pode ser vazio!`, {
          autoClose: 3500,
        });
      }
    } else {
      toast.error(`O Nome não pode ser vazio!`, {
        autoClose: 3500,
      });
    }
  };

  const handleSaveClick2 = async () => {
    if (document.getElementById("editImg").value !== "") {
      setShowModal(false);
      try {
        const img = document.getElementById("editImg").value;
        const id = drink.id;

        // Enviar a solicitação de atualização para a API
        await axios.post(`https://localhost:7280/Drinks/PostDrinks/${id}`, {
          ...drink,
          image: img,
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
    } else {
      toast.error(`O nome não pode ser vazio!`, { autoClose: 3500 });
    }
  };

  return (
    <div>
      <div
        className={`bebida ${isEditing ? "edit-mode" : ""}`}
        id={drink.name}
        onClick={() => {
          if (!isEditing) {
            handleOnClick(drink);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleOnClick(drink);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className="name">
          <h2>
            {isEditing ? (
              <input
                className="input-drink h2"
                id="editName"
                type="text"
                defaultValue={drink.name}
                maxLength={13}
                required
              />
            ) : (
              drink.name
            )}
          </h2>
        </div>
        <div className="image">
          <div className="image">
            {isEditing ? (
              <button onClick={() => setShowModal(true)}>
                <img src={drink.image} alt={drink.name} />
              </button>
            ) : (
              <img src={drink.image} alt={drink.name} />
            )}

            {showModal && (
              <Modal>
                <div className="editImg">
                  <h2>Digite o link da imagem</h2>
                  <input
                    type="text"
                    id="editImg"
                    defaultValue={drink.image}
                    required
                  />
                  <button id="saveImg" onClick={handleSaveClick2}>
                    Salvar
                  </button>
                  <button id="cancelImg" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                </div>
              </Modal>
            )}
          </div>
        </div>
        <div className="price">
          <h3>
            {isEditing ? (
              <input
                className="input-drink h3"
                id="editPrice"
                type="text"
                defaultValue={drink.price.toFixed(2)}
                maxLength={4}
                required
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
                  maxLength={2}
                  required
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
                  maxLength={2}
                  required
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
          <div className="editButtons">
            <button className="save" onClick={handleSaveClick}>
              Salvar
            </button>
            <button className="cancel" onClick={handleCancelClick}>
              Cancelar
            </button>
          </div>
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
