import React, { Component } from "react";

class Clasificacion extends Component {
  render() {
    //miRondaInformacion es un json con parejas y partidos
    const { torneoInfo, miRondaInformacion } = this.props.torneoApuntadoInfo;

    let tableJor = [];
    let m = 0;
    let createTableJornada = () => {
      for (var i = 0; torneoInfo.couples.length; i++) {
        if (
          torneoInfo.couples[i].user1Id === user.id ||
          torneoInfo.couples[i].user2Id === user.id
        ) {
          let grupo = torneoInfo.couples[i].grupoActual;
          let ronda = torneoInfo.rondaActual;
          for (let k = 0; miRondaInformacion.partidos.length; k++) {
            let children = [];
            let children2 = [];
            if (
              miRondaInformacion.partidos[k].numeroGrupo === grupo &&
              miRondaInformacion.partidos[k].numeroRonda === ronda
            ) {
              children.push(<td key={j}>Pareja 1 por hacer</td>);
              m++;
              children.push(
                <td key={j}>{miRondaInformacion.partidos[k].set1Couple1}</td>
              );
              m++;
              children.push(
                <td key={j}>{miRondaInformacion.parejas[k].set2Couple1}</td>
              );
              m++;
              children.push(
                <td key={j}>{miRondaInformacion.parejas[k].set3Couple1}</td>
              );
              m++;
              table.push(
                <tr key={i} className="text-center">
                  {children}
                </tr>
              );

              children2.push(<td key={j}>Pareja 2 por hacer</td>);
              m++;
              children2.push(
                <td key={j}>{miRondaInformacion.partidos[k].set1Couple2}</td>
              );
              m++;
              children2.push(
                <td key={j}>{miRondaInformacion.parejas[k].set2Couple2}</td>
              );
              m++;
              children2.push(
                <td key={j}>{miRondaInformacion.parejas[k].set3Couple2}</td>
              );
              m++;
              table.push(
                <tr key={i} className="text-center">
                  {children2}
                </tr>
              );
              <div>
                <p></p>
              </div>;
            }
          }
        }
      }

      return table;
    };

    let table = [];
    let j = 0;
    let createTable = () => {
      for (var i = 0; torneoInfo.couples.length; i++) {
        if (
          torneoInfo.couples[i].user1Id === user.id ||
          torneoInfo.couples[i].user2Id === user.id
        ) {
          let grupo = torneoInfo.couples[i].grupoActual;
          for (var k = 0; miRondaInformacion.parejas.length; k++) {
            let children = [];
            if (miRondaInformacion.parejas[k].grupo === grupo) {
              j++;
              children.push(<td key={j}>Clasificacion por hacer</td>);
              j++;
              //Tengo que hacer el getUser1Id !!!!
              children.push(
                <td key={j} className="text-left">
                  {miRondaInformacion.parejas[k].user1Name} y
                  {miRondaInformacion.parejas[k].user2Name}
                </td>
              );
              j++;
              children.push(
                <td key={j}>{miRondaInformacion.parejas[k].puntos}</td>
              );
              j++;
              children.push(
                <td key={j}>{miRondaInformacion.parejas[k].partidosJugados}</td>
              );
              j++;
              children.push(
                <td key={j}>{miRondaInformacion.parejas[k].partidosGanados}</td>
              );
              j++;
              children.push(
                <td key={j}>
                  {miRondaInformacion.parejas[k].partidosPerdidos}
                </td>
              );
              j++;
              children.push(
                <td key={j}>{miRondaInformacion.parejas[k].setsGanados}</td>
              );
              j++;
              children.push(
                <td key={j}>{miRondaInformacion.parejas[k].setsPerdidos}</td>
              );
              j++;
              children.push(
                <td key={j}>{miRondaInformacion.parejas[k].juegosGanados}</td>
              );
              j++;
              children.push(
                <td key={j}>{miRondaInformacion.parejas[k].juegosPerdidos}</td>
              );
              j++;
              children.push(
                <td key={j}>{miRondaInformacion.parejas[k].diferenciaSets}</td>
              );
              j++;
              children.push(
                <td key={j}>
                  {miRondaInformacion.parejas[k].diferenciaJuegos}
                </td>
              );
              j++;
            }
          }
        }
        table.push(
          <tr key={i} className="text-center">
            {children}
          </tr>
        );
      }

      return table;
    };

    let tablaRondaContent = (
      <div>
        <table>
          <thead>
            <tr>
              <th>Clasificación </th>
              <th>Jugadores </th>
              <th>Puntos </th>
              <th>Partidos jugados </th>
              <th>Partidos ganados</th>
              <th>Partidos perdidos </th>
              <th>Sets ganados </th>
              <th>Sets perdidos </th>
              <th>Juegos ganados </th>
              <th>Juegos perdidos </th>
              <th>Diferencia de sets </th>
              <th>Diferencia de juegos </th>
            </tr>
          </thead>
          <tbody>{createTable()}</tbody>
        </table>
      </div>
    );

    let tablaJornadaContent = (
      <div>
        <table>
          <thead>
            <tr>
              <th>Partidos (Parejas)</th>
              <th>1Set </th>
              <th>2Set </th>
              <th>3Set </th>
            </tr>
          </thead>
          <tbody>{createTableJornada()}</tbody>
        </table>
      </div>
    );

    return (
      <div className="info-torneo">
        <div className="container">
          <div className="col-md-8 m-auto">
            <h2 className="display-4 text-center">
              Información de tu ronda y grupo
            </h2>
            <h3>Ronda {torneoInfo.rondaActual}</h3>
            {tablaRondaContent}
            <h3>Jornadas</h3>
            {tablaJornadaContent}
          </div>
        </div>
      </div>
    );
  }
}

TorneoApuntadoInfo.propTypes = {
  torneoApuntadoInfo: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoApuntadoInfo: state.torneoApuntadoInfo
});

export default connect(
  mapStateToProps,
  { getInfoRonda }
)(Clasificacion);
