import { useState } from "react";
import Modal from "./Modal";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import LineChart from "./LineChart";
import _ from "lodash";

const Analytics = () => {
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [dadosMessages, setDadosMessages] = useState([]);
  const [chartDataBySomethin, setChartDataBySomethin] = useState({});
  // eslint-disable-next-line no-unused-vars
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

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1); // Definir o mês na data
    const monthName = format(date, "LLLL", { locale: pt });
    return capitalize(monthName);
  };

  const getSomethinChartData = () => {
    const storedDadosMessages =
      JSON.parse(localStorage.getItem("dadosMessages")) || [];
      setDadosMessages(storedDadosMessages);

      const groupedData = _.groupBy(storedDadosMessages, "year");

      const chartDataBySomethin = {};

      // Itere sobre os grupos de dados e crie o formato esperado pelo gráfico para cada mês
      for (const year in groupedData) {
        const yearData = groupedData[year];
        const chartData = {
          labels: yearData.map((data) => data.month),
          datasets: [
            {
              label: "Dinheiro Ganho",
              data: yearData.map((data) => data.price),
              backgroundColor: ["#ffffff"],
              pointBackgroundColor: "black",
              pointBorderColor: "white",
              borderColor: "white",
              borderWidth: 2,
            },
          ],
        };
        chartDataBySomethin[year] = chartData;
      }

    return chartDataBySomethin;
  };

  const storedDadosMessages =
    JSON.parse(localStorage.getItem("dadosMessages")) || [];

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const renderedDate = new Set();
  const sortedDadosMessages = storedDadosMessages.sort((a, b) => a.day - b.day);
  

  const handleAnosValue = () => {
    if(document.getElementById("anos").value !== "") {
      const somethinChartData = getSomethinChartData();
      setChartDataBySomethin(somethinChartData);
      document.getElementById("meses").disabled = false;
      document.getElementById("meses").value = "";
      document.getElementById("dias").disabled = false;
      document.getElementById("dias").value = "";
    } else {
      document.getElementById("meses").disabled = true;
      document.getElementById("dias").disabled = true;
    }
  }

  const handleMesesValue = () => {
    if(document.getElementById("meses").value !== "") {
      document.getElementById("dias").disabled = false;
      document.getElementById("dias").value = "";
    } else {
      document.getElementById("dias").disabled = true;
    }
  }

  return (
    <div className="history">
      <div className="log">
        <button
          onClick={() => {
            handleModalOpen();
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
              <div className="title">
                <h1>Atividade</h1>
              </div>
              <div className="atividade">
                <div className="filtrar">
                  <h2>Filtrar</h2>
                  <select name="anos" id="anos" onChange={() => handleAnosValue()}>
                    <option value="">Selecione o Ano</option>
                    {storedDadosMessages.map((data) => {
                      if (!renderedDate.has(data.year)) {
                        renderedDate.add(data.year);
                        return (
                          <option key={data.year} value={data.year}>
                            {data.year}
                          </option>
                        );
                      }
                      return null;
                    })}
                  </select>

                  <select name="meses" id="meses" disabled onChange={() => handleMesesValue()}>
                    <option value="">Selecione o Mês</option>
                    {storedDadosMessages.map((data) => {
                      if (!renderedDate.has(data.month)) {
                        renderedDate.add(data.month);
                        return (
                          <option key={data.month} value={data.month}>
                            {getMonthName(data.month)}
                          </option>
                        );
                      }
                      return null;
                    })}
                  </select>

                  <select name="dias" id="dias" disabled>
                    <option value="">Selecione o Dia</option>
                    {sortedDadosMessages.map((data) => {
                      if (!renderedDate.has(data.day)) {
                        renderedDate.add(data.day);
                        return (
                          <option key={data.day} value={data.day}>
                            {data.day}
                          </option>
                        );
                      }
                      return null;
                    })}
                  </select>
                </div>
                <div className="lista graficos">
                  {Object.entries(chartDataBySomethin).map(
                    ([year, chartData]) => (
                      <div key={year} style={{ width: 700 }}>
                        <h3>{`${year}`}</h3>
                        <LineChart chartDadosMessages={chartData} />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
};

export default Analytics;
