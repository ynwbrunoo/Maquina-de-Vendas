const Info = ({ total }) => {

  const totalDinheiro = parseInt(total) < 100 ? (parseInt(total)) + " cent" : (parseInt(total) / 100) + " EUR";

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
                <td></td>
              </tr>
              <tr>
                <th>Valor introduzido até agora:</th>
                <td>{totalDinheiro}</td>
              </tr>
              <tr>
                <th>Falta pagar:</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Info;

