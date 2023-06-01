import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";

const Log = () => {
  const [showModal, setShowModal] = useState(false);
  const [logMessages, setLogMessages] = useState([]);

  // Função assíncrona para obter os dados do moedeiro da API
  const fetchLogMessages = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7280/LogMessages/GetLogMessages"
      );
      if (response.isLoading) {
        return (
          <div className="loading-pane">
            <h2 className="loader">🧃</h2>
          </div>
        );
      }
      setLogMessages(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
    return (
      <div className="history">
        <div className="log">
          <button
            onClick={() => {
              setShowModal(true), fetchLogMessages();
            }}
          >
            <img
              src="https://www.seekpng.com/png/full/781-7815113_history-icon-white-png.png"
              alt="Histórico"
            />{" "}
            Histórico
          </button>
          {showModal ? (
            <Modal>
              <div className="buttons">
                <button onClick={() => setShowModal(false)}>Fechar</button>
              </div>
              <div className="historico">
                <h2>Histórico:</h2>
                {logMessages !== null && logMessages.length > 0 ? (
                  <div className="lista">
                    <ul>
                      {logMessages.reverse().map((message) => (
                        <li key={message.id}>{message.message}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <h2>NENHUM RESULTADO</h2>
                )}
                </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }

export default Log;
