import { useState } from "react";
import Modal from "./Modal";
import LineChart from "./LineChart";
import _ from "lodash";

const Analytics = () => {
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [dadosMessages, setDadosMessages] = useState([]);
  const [chartDataByMonth, setChartDataByMonth] = useState({});
  const [chartDadosMessages, setChartDadosMessages] = useState({
    labels: [],
    datasets: [
      {
        label: "Dinheiro Ganho",
        data: [],
        backgroundColor: ["#ffffff"],
        borderColor: "white",
        borderWidth: 3,
      },
    ],
  });

  const getMonthlyChartData = () => {
    const storedDadosMessages =
      JSON.parse(localStorage.getItem("dadosMessages")) || [];

    // Agrupe os dados por mês usando o lodash
    const groupedData = _.groupBy(storedDadosMessages, "month");

    // Crie um objeto vazio para armazenar os dados do gráfico por mês
    const chartDataByMonth = {};

    // Itere sobre os grupos de dados e crie o formato esperado pelo gráfico para cada mês
    for (const month in groupedData) {
      const monthData = groupedData[month];
      const chartData = {
        labels: monthData.map((data) => data.day),
        datasets: [
          {
            label: "Dinheiro Ganho",
            data: monthData.map((data) => data.price),
            backgroundColor: ["#ffffff"],
            pointBackgroundColor: "black",
            pointBorderColor: "white",
            borderColor: "white",
            borderWidth: 2,
          },
        ],
      };
      chartDataByMonth[month] = chartData;
    }

    return chartDataByMonth;
  };

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
          backgroundColor: "#ffffff",
          pointBackgroundColor: "black",
          pointBorderColor: "white",
          borderColor: "white",
          borderWidth: 2,
          fill: true,
        },
      ],
    };
    setChartDadosMessages(chartData);
  };

  const handleModalOpen = () => {
    setShowModal(true);
    const monthlyChartData = getMonthlyChartData();
    setChartDataByMonth(monthlyChartData);
  };

  return (
    <div className="history">
      <div className="log">
        <button
          onClick={() => {
            handleModalOpen();
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
              <div className="lista">
                {Object.entries(chartDataByMonth).map(([month, chartData]) => (
                  <div key={month} style={{ width: 700 }}>
                    <h3>{`Mês ${month}`}</h3>
                    <LineChart chartDadosMessages={chartData} />
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default Analytics;
