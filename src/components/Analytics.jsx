import { useState } from "react";
import Modal from "./Modal";
import LineChart from "./LineChart";

const Analytics = () => {
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [dadosMessages, setDadosMessages] = useState([]);
  const [chartDadosMessages, setChartDadosMessages] = useState({
    labels: [],
    datasets: [
      {
        label: "Dinheiro Ganho",
        data: [],
        backgroundColor: [
          "#ffffff",
        ],
        borderColor: "white",
        borderWidth: 3,
      },
    ],
  });

  const getLogMessages = () => {
    const storedDadosMessages =
      JSON.parse(localStorage.getItem("dadosMessages")) || [];
    setDadosMessages(storedDadosMessages);

    const chartData = {
      labels: storedDadosMessages.map((data) => data.day),
      datasets: [
        {
          label: "Dinheiro Ganho",
          data: storedDadosMessages.map((data) => data.price),
          backgroundColor: [
            "#ffffff",
          ],
          pointBackgroundColor: "black",
          pointBorderColor: "white",
          borderColor: "white",
          borderWidth: 2,
        },
      ],
    };
    setChartDadosMessages(chartData);
  };

  return (
    <div className="history">
      <div className="log">
        <button
          onClick={() => {
            setShowModal(true);
            getLogMessages();
          }}
        >
          <img
            src="https://flaticons.net/icon.php?slug_category=user-interface&slug_icon=data-analysis"
            alt="Análise"
          />{" "}
          Análise
        </button>
        {showModal ? (
          <Modal>
            <div className="buttons">
              <button onClick={() => setShowModal(false)}>Fechar</button>
            </div>
            <div className="historico">
              <h2>Análise:</h2>
              <div style={{ width: 700 }}>
                <LineChart chartDadosMessages={chartDadosMessages} />
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default Analytics;

