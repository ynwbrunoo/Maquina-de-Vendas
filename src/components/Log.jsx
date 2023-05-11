import { useState } from "react";
import Modal from "./Modal";

const Log = () => {
  const [showModal, setShowModal] = useState(false);
  const [logMessages, setLogMessages] = useState([]);

  const getLogMessages = () => {
    const storedLogMessages =
      JSON.parse(localStorage.getItem("logMessages")) || [];
    setLogMessages(storedLogMessages);
  };

  return (
    <div className="history">
      <div className="log">
        <button
          onClick={() => {
            setShowModal(true), getLogMessages();
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
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
            <div className="historico">
              <h2>Histórico:</h2>
              <div className="lista">
                <ul>
                  {logMessages.reverse().map((message, index) => (
                    <li key={index}>{message}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default Log;
