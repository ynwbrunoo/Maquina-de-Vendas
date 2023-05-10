import { useState } from "react";
import Modal from "./Modal";

const Log = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="history">
      <div className="log">
        <button onClick={() => setShowModal(true)}>
          <img
            src="https://www.seekpng.com/png/full/781-7815113_history-icon-white-png.png"
            alt="Histórico"
          />{" "}
          Histórico
        </button>
        {showModal ? (
          <Modal>
            <div>
              <h1>Would you like to adopt?</h1>
              <div className="buttons">
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default Log;
