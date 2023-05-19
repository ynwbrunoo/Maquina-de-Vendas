import { useState } from "react";
import Modal from "./Modal";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import LineChart from "./LineChart";
import _ from "lodash";

const Analytics = () => {
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [dadosMesMessages, setDadosMesMessages] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [dadosAnoMessages, setDadosAnoMessages] = useState([]);
  const [chartDataByYear, setChartDataByYear] = useState({});
  const [chartDataByMonthAndYear, setChartDataByMonthAndYear] = useState({});


  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1); // Definir o mês na data
    const monthName = format(date, "LLLL", { locale: pt });
    return capitalize(monthName);
  };

  const getYearChartData = () => {
    const storedDadosAnoMessages =
      JSON.parse(localStorage.getItem("dadosAnoMessages")) || [];
      setDadosAnoMessages(storedDadosAnoMessages);
      
      const groupedData = _.groupBy(storedDadosAnoMessages, "year");

      const chartDataByYear = {};

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
        chartDataByYear[year] = chartData;
      }

    return chartDataByYear;
  };

  const getMonthChartData = () => {
    const storedDadosMesMessages =
      JSON.parse(localStorage.getItem("dadosMesMessages")) || [];
      setDadosMesMessages(storedDadosMesMessages);

      const groupedDataByYear = _.groupBy(storedDadosMesMessages, "year");
      const groupedDataByMonthAndYear = _.mapValues(groupedDataByYear, yearData => _.groupBy(yearData, "month"));

      const chartDataByMonthAndYear = {};
    
    for (const year in groupedDataByMonthAndYear) {
        const yearData = groupedDataByMonthAndYear[year];
        chartDataByMonthAndYear[year] = {};
        for (const month in yearData) {
            const monthData = yearData[month];
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
            chartDataByMonthAndYear[year][month] = chartData;
        }
    }

    return chartDataByMonthAndYear;
  };

  const storedDadosMesMessages =
    JSON.parse(localStorage.getItem("dadosMesMessages")) || [];

  const storedDadosAnoMessages =
    JSON.parse(localStorage.getItem("dadosAnoMessages")) || [];

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const renderedDate = new Set();
  const sortedDadosMesMessages = storedDadosMesMessages.sort((a, b) => a.day - b.day);
  
  const handleAnosValue = () => {
    if(document.getElementById("anos").value !== "") {
      const yearChartData = getYearChartData();
      setChartDataByYear(yearChartData);
      document.getElementById("meses").disabled = false;
      document.getElementById("meses").value = "";
    } else {
      document.getElementById("meses").disabled = true;
      document.getElementById("dias").disabled = true;
      document.getElementById("dias").value = "";
    }
  }

  const handleMesesValue = () => {
    if(document.getElementById("meses").value !== "") {
      const monthChartData = getMonthChartData();
      setChartDataByMonthAndYear(monthChartData);
      document.getElementById("dias").disabled = false;
    } else {
      document.getElementById("dias").disabled = true;
      document.getElementById("dias").value = "";
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
                    {storedDadosAnoMessages.map((data) => {
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
                    {dadosAnoMessages.map((data) => {
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
                    {sortedDadosMesMessages.map((data) => {
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
                {
                  (() => {
                    if (document.getElementById("dias") && document.getElementById("dias").value !== "") {
                      return <div>Olá</div>;
                    } else if (document.getElementById("meses") && document.getElementById("meses").value !== "") {
                      const selectedMonth = document.getElementById("meses").value;
                      const selectedYear = document.getElementById("anos").value;

                      const filteredChartData = chartDataByMonthAndYear[selectedYear][selectedMonth];

                      return (
                          <>
                              <div style={{ width: 700 }}>
                                  <h3>{`${getMonthName(selectedMonth)}`}</h3>
                                  <LineChart chartDadosMessages={filteredChartData} />
                              </div>
                          </>
                      );
                    } else if (document.getElementById("anos") && document.getElementById("anos").value !== "") {
                      const selectedYear = document.getElementById("anos").value;
                      
                      const filteredChartData = chartDataByYear[selectedYear];

                      return (
                          <>
                              <div style={{ width: 700 }}>
                                  <h3>{`${selectedYear}`}</h3>
                                  <LineChart chartDadosMessages={filteredChartData} />
                              </div>
                          </>
                      );
                    }
                  })()
                }
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
