import { useState, useEffect } from "react";

const Info = ({ total, selectedDrink }) => {
  const [faltaPagar, setFaltaPagar] = useState();

  useEffect(() => {
    if (selectedDrink) {
      setFaltaPagar(selectedDrink.price - (parseInt(total) / 100));
    } else {
      setFaltaPagar();
    }
  }, [selectedDrink, total]);

  return (
    <div className="info">
      <div className="title">
        <h2>Estado Actual:</h2>
      </div>
      <div className="valor">
        <div className="tabela">
          <table>
            <tbody>
              <tr>
                <th>Valor a pagar:</th>
                <td>{selectedDrink ? `${selectedDrink.price} EUR` : "0"}</td>
              </tr>
              <tr>
                <th>Valor introduzido até agora:</th>
                <td>{parseInt(total) / 100}</td>
              </tr>
              <tr>
                <th>Falta pagar:</th>
                <td>{faltaPagar > 0 ? `${Math.round(faltaPagar * 10) / 10} EUR` : "0"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Info;
