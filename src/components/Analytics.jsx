import { useState } from "react";
import Modal from "./Modal";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import LineChart from "./LineChart";
import _ from "lodash";
import axios from "axios";

const Analytics = () => {
  const [showModal, setShowModal] = useState(false);
  const [storedDadosDiaMessages, setStoredDadosDiaMessages] = useState([]);
  const [storedDadosMesMessages, setStoredDadosMesMessages] = useState([]);
  const [storedDadosAnoMessages, setStoredDadosAnoMessages] = useState([]);

      const fetchStoredDadosDiaMessages = async () => {
        try {
          const response = await axios.get(
            "https://localhost:7280/DadosDiaMessages/GetDadosDiaMessages"
          );
          setStoredDadosDiaMessages(response.data || "");
        } catch (error) {
          console.error(error);
        }
      };
  
      // Chamar a função para obter os dados do moedeiro ao montar o componente
      fetchStoredDadosDiaMessages();

      // Função assíncrona para obter os dados do moedeiro da API
      const fetchStoredDadosMesMessages = async () => {
        try {
          const response = await axios.get(
            "https://localhost:7280/DadosMesMessages/GetDadosMesMessages"
          );
          setStoredDadosMesMessages(response.data || "");
        } catch (error) {
          console.error(error);
        }
      };
  
      // Chamar a função para obter os dados do moedeiro ao montar o componente
      fetchStoredDadosMesMessages();

      // Função assíncrona para obter os dados do moedeiro da API
      const fetchStoredDadosAnoMessages = async () => {
        try {
          const response = await axios.get(
            "https://localhost:7280/DadosAnoMessages/GetDadosAnoMessages"
          );
          setStoredDadosAnoMessages(response.data || "");
        } catch (error) {
          console.error(error);
        }
      };

  const [chartDataByYear, setChartDataByYear] = useState({});
  const [chartDataByMonthAndYear, setChartDataByMonthAndYear] = useState({});
  const [chartDataByDayAndMonthAndYear, setChartDataByDayAndMonthAndYear] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [chartOptionsDefault, setChartOptionsDefault] = useState({
    plugins: {
      legend: true,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Tempo Indefinido",
        },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 90,
        },
      },
      y: {
        title: {
          display: true,
          text: "Lucro €",
        },
        min: 0,
      },
    },
  });

  const chartDataDefault = {
    labels: "-",
    datasets: [
      {
        label: "-",
        data: "-",
        backgroundColor: ["#ffffff"],
        pointBackgroundColor: "black",
        pointBorderColor: "white",
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };


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

  const getDayChartData = () => {
  
    const groupedDataByYear = _.groupBy(storedDadosDiaMessages, "year");
    const chartDataByDayAndMonthAndYear = {};
  
    for (const year in groupedDataByYear) {
      chartDataByDayAndMonthAndYear[year] = {};
      const yearData = groupedDataByYear[year];
      const groupedDataByMonth = _.groupBy(yearData, "month");
  
      for (const month in groupedDataByMonth) {
        chartDataByDayAndMonthAndYear[year][month] = {};
        const monthData = groupedDataByMonth[month];
        const groupedDataByDay = _.groupBy(monthData, "day");
  
        for (const day in groupedDataByDay) {
          const dayData = groupedDataByDay[day];
          const chartData = {
            labels: [],
            datasets: [
              {
                label: "Dinheiro Ganho",
                data: [],
                backgroundColor: ["#ffffff"],
                pointBackgroundColor: "black",
                pointBorderColor: "white",
                borderColor: "white",
                borderWidth: 2,
              },
            ],
          };
  
          dayData.forEach((data) => {
            chartData.labels.push(data.hour);
            chartData.datasets[0].data.push(Number(data.price));
          });
  
          chartDataByDayAndMonthAndYear[year][month][day] = chartData;
        }
      }
    }
  
    return chartDataByDayAndMonthAndYear;
  };
  
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const renderedDate = new Set();
  const sortedDadosDiaMessages = storedDadosDiaMessages.sort((a, b) => a.day - b.day);
  const sortedDadosMesMessages = storedDadosMesMessages.sort((a, b) => a.month - b.month);
  
  const handleAnosValue = () => {
    if(document.getElementById("anos").value !== "") {
      const selectedYear = document.getElementById("anos").value;
  
      const monthChartData = getMonthChartData(selectedYear);
      setChartDataByMonthAndYear(monthChartData);
  
      const filteredMonths = Object.keys(monthChartData[selectedYear]);
      const mesesSelect = document.getElementById("meses");
  
      // Remova as opções existentes no campo de seleção de meses
      while (mesesSelect.options.length > 0) {
        mesesSelect.remove(0);
      }

      const option = document.createElement("option");
      option.text = "Selecione o Mês";
      option.value = "";
      mesesSelect.add(option);
  
      // Adicione as opções apenas para os meses correspondentes ao ano selecionado
      filteredMonths.forEach((month) => {
        const monthName = getMonthName(month);
        const option = document.createElement("option");
        option.text = monthName;
        option.value = month;
        mesesSelect.add(option);
      });

      const yearChartData = getYearChartData();
      setChartDataByYear(yearChartData);
      document.getElementById("meses").disabled = false;
      document.getElementById("meses").value = "";
      setChartOptions({
        plugins: {
          legend: true,
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Meses",
            },
            ticks: {
              autoSkip: false,
            },
          },
          y: {
            title: {
              display: true,
              text: "Lucro €",
            },
            min: 0,
          },
        },
      });
    } else {
      document.getElementById("meses").disabled = true;
      document.getElementById("meses").value = "";
      document.getElementById("dias").disabled = true;
      document.getElementById("dias").value = "";
      setChartDataByYear(null);
    }
  }

  const handleMesesValue = () => {
    if (document.getElementById("meses").value !== "") {
      const selectedYear = document.getElementById("anos").value;
      const selectedMonth = document.getElementById("meses").value;
  
      const dayChartData = getDayChartData(selectedMonth);
      setChartDataByDayAndMonthAndYear(dayChartData);
  
      const filteredDays = Object.keys(dayChartData[selectedYear][selectedMonth]);
      const diasSelect = document.getElementById("dias");
  
      // Remova as opções existentes no campo de seleção de dias
      while (diasSelect.options.length > 0) {
        diasSelect.remove(0);
      }

      const option = document.createElement("option");
      option.text = "Selecione o Dia";
      option.value = "";
      diasSelect.add(option);
  
      // Adicione as opções apenas para os dias correspondentes ao ano selecionado
      filteredDays.forEach((day) => {
        const option = document.createElement("option");
        option.text = day;
        option.value = day;
        diasSelect.add(option);
      });
  
      document.getElementById("dias").disabled = false;
      setChartOptions({
        plugins: {
          legend: true,
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Dias",
            },
            ticks: {
              autoSkip: false,
            },
          },
          y: {
            title: {
              display: true,
              text: "Lucro €",
            },
            min: 0,
          },
        },
      });
    } else {
      const yearChartData = getYearChartData();
      setChartDataByYear(yearChartData);
      document.getElementById("dias").disabled = true;
      document.getElementById("dias").value = "";
      setChartOptions({
        plugins: {
          legend: true,
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Meses",
            },
            ticks: {
              autoSkip: false,
            },
          },
          y: {
            title: {
              display: true,
              text: "Lucro €",
            },
            min: 0,
          },
        },
      });
    }
  };

  const handleDiasValue = () => {
    if(document.getElementById("dias").value !== "") {
      const dayChartData = getDayChartData();
      setChartDataByDayAndMonthAndYear(dayChartData);
      setChartOptions({
        plugins: {
          legend: true,
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Horas",
            },
            ticks: {
              autoSkip: false,
            },
          },
          y: {
            title: {
              display: true,
              text: "Lucro €",
            },
            min: 0,
          },
        },
      });
    } else {
      const monthChartData = getMonthChartData();
      setChartDataByMonthAndYear(monthChartData);
      setChartOptions({
        plugins: {
          legend: true,
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Dias",
            },
            ticks: {
              autoSkip: false,
            },
          },
          y: {
            title: {
              display: true,
              text: "Lucro €",
            },
            min: 0,
          },
        },
      });
    }
  }

  const handleCleanValues = () => {
    document.getElementById("dias").value = "";
    document.getElementById("meses").value = "";
    document.getElementById("anos").value = "";
    setChartDataByYear(null);
    setChartOptions({
      plugins: {
        legend: true,
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Meses",
          },
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90,
          },
        },
        y: {
          title: {
            display: true,
            text: "Lucro €",
          },
          min: 0,
        },
      },
    });
  }

  return (
    <div className="history">
      <div className="log">
        <button
          onClick={() => {
            handleModalOpen();
            fetchStoredDadosAnoMessages();
            fetchStoredDadosDiaMessages();
            fetchStoredDadosMesMessages();
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
                    {storedDadosAnoMessages.reverse().map((data) => {
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
                    {sortedDadosMesMessages.map((data) => {
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

                  <select name="dias" id="dias" disabled onChange={() => handleDiasValue()}>
                    <option value="">Selecione o Dia</option>
                    {sortedDadosDiaMessages.map((data) => {
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
                  <button onClick={() => handleCleanValues()}>Limpar</button>
                </div>
                <div className="graficos">
                {
                  (() => {
                    if (document.getElementById("dias") && document.getElementById("dias").value !== "") {
                      const selectedDay = document.getElementById("dias").value;
                      const selectedMonth = document.getElementById("meses").value;
                      const selectedYear = document.getElementById("anos").value;

                      const filteredChartData = chartDataByDayAndMonthAndYear[selectedYear][selectedMonth][selectedDay];

                      return (
                          <>
                              <div style={{ width: 700 }}>
                                  <h3>{`Dia ${selectedDay}`}</h3>
                                  <LineChart chartDadosMessages={filteredChartData} chartOptions={chartOptions} />
                              </div>
                          </>
                      );
                    } else if (document.getElementById("meses") && document.getElementById("meses").value !== "") {
                      const selectedMonth = document.getElementById("meses").value;
                      const selectedYear = document.getElementById("anos").value;

                      const filteredChartData = chartDataByMonthAndYear[selectedYear][selectedMonth];

                      return (
                          <>

                              <div style={{ width: 700 }}>
                                  <h3>{`${getMonthName(selectedMonth)}`}</h3>
                                  <LineChart chartDadosMessages={filteredChartData} chartOptions={chartOptions}/>
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
                                  <LineChart chartDadosMessages={filteredChartData} chartOptions={chartOptions}/>
                              </div>
                          </>
                      );
                    } else {
                      return (
                        <>
                            <div style={{ width: 700 }}>
                                <h3>{`-`}</h3>
                                <LineChart chartDadosMessages={chartDataDefault} chartOptions={chartOptionsDefault}/>
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
