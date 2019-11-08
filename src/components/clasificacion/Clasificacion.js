import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  miRondaInfo,
  infoTorneoComenzadoParticipo
} from "../../actions/torneoInfoAction";

class Clasificacion extends Component {
  // componentDidMount() {
  //   this.props.infoTorneoComenzadoParticipo();
  // }
  render() {
    //miRondaInformacion es un json con parejas y partidos
    const { torneoInformacion, miRondaInformacion } = this.props.torneoInfo;
    const { user } = this.props.auth;
    let tableJor2 = [];
    let tableJor = [];
    let m = 0;
    let createTableJornada = () => {
      for (
        var i = 0;
        i < torneoInformacion.tournament.couples.length - 1;
        i++
      ) {
        if (
          torneoInformacion.tournament.couples[i].user1Id === user.id ||
          torneoInformacion.tournament.couples[i].user2Id === user.id
        ) {
          let children = [];
          let idCouple = torneoInformacion.tournament.couples[i].id;
          let grupo = torneoInformacion.tournament.couples[i].grupoActual;
          let ronda = torneoInformacion.tournament.rondaActual;
          console.log(
            "Tengo grupo y ronda de mi usuario, respectivamente: ",
            grupo,
            ronda
          );

          for (let k = 0; k < miRondaInformacion.partidos.length - 1; k++) {
            if (
              miRondaInformacion.partidos[k].numeroGrupo === grupo &&
              miRondaInformacion.partidos[k].numeroRonda === ronda
            ) {
              console.log("info de la ronda: ", miRondaInformacion);
              children.push(
                <td key={m}> {miRondaInformacion.partidos[k].couple1Id}</td>
              );
              m++;
              children.push(
                <td key={m}>{miRondaInformacion.partidos[k].set1Couple1}</td>
              );
              console.log(
                "Set1Couple1",
                miRondaInformacion.partidos[k].set1Couple1
              );
              m++;
              children.push(
                <td key={m}>{miRondaInformacion.parejas[k].set2Couple1}</td>
              );
              m++;
              children.push(
                <td key={m}>{miRondaInformacion.parejas[k].set3Couple1}</td>
              );
              m++;
              tableJor.push(
                <tr key={i} className="text-center">
                  {children}
                </tr>
              );
              children = [];
              children.push(
                <td key={m}> {miRondaInformacion.partidos[k].couple2Id}</td>
              );
              m++;
              children.push(
                <td key={m}>{miRondaInformacion.partidos[k].set1Couple2}</td>
              );
              m++;
              children.push(
                <td key={m}>{miRondaInformacion.parejas[k].set2Couple2}</td>
              );
              m++;
              children.push(
                <td key={m}>{miRondaInformacion.parejas[k].set3Couple2}</td>
              );
              m++;
              tableJor.push(
                <tr key={i} className="text-center">
                  {children}
                </tr>
              );

              tableJor.push(<tr key={i}>{}</tr>);

              // for (let l = 0; l < miRondaInformacion.parejas.length - 1; l++) {
              //   if (
              //     miRondaInformacion.partidos[k].couple1Id ===
              //     miRondaInformacion.parejas[l].id
              //   ) {
              //     let nombre11 = miRondaInformacion.parejas[l].user1Name;
              //     let apellido11 = miRondaInformacion.parejas[l].user1LastName;
              //     let nombre12 = miRondaInformacion.parejas[l].user2Name;
              //     let apellido12 = miRondaInformacion.parejas[l].user2LastName;
              //     children.push(
              //       <td key={m}>
              //         {" "}
              //         {nombre11} {apellido11}y {nombre12} {apellido12}
              //       </td>
              //     );
              //     m++;
              //     children.push(
              //       <td key={m}>
              //         {miRondaInformacion.partidos[k].set1Couple1}
              //       </td>
              //     );
              //     m++;
              //     children.push(
              //       <td key={m}>{miRondaInformacion.parejas[k].set2Couple1}</td>
              //     );
              //     m++;
              //     children.push(
              //       <td key={m}>{miRondaInformacion.parejas[k].set3Couple1}</td>
              //     );
              //     m++;
              //     tableJor.push(
              //       <tr key={i} className="text-center">
              //         {children}
              //       </tr>
              //     );
              //     if (
              //       miRondaInformacion.partidos[k].couple2Id ===
              //       miRondaInformacion.parejas[l].id
              //     ) {
              //       let nombre21 = miRondaInformacion.parejas[l].user1Name;
              //       let apellido21 =
              //         miRondaInformacion.parejas[l].user1LastName;
              //       let nombre22 = miRondaInformacion.parejas[l].user2Name;
              //       let apellido22 =
              //         miRondaInformacion.parejas[l].user2LastName;
              //       children.push(
              //         <td key={m}>
              //           {" "}
              //           {nombre21} {apellido21}y {nombre22} {apellido22}
              //         </td>
              //       );

              //       children.push(
              //         <td key={m}>
              //           {miRondaInformacion.partidos[k].set1Couple2}
              //         </td>
              //       );
              //       m++;
              //       children.push(
              //         <td key={m}>
              //           {miRondaInformacion.parejas[k].set2Couple2}
              //         </td>
              //       );
              //       m++;
              //       children.push(
              //         <td key={m}>
              //           {miRondaInformacion.parejas[k].set3Couple2}
              //         </td>
              //       );
              //       m++;
              //       tableJor.push(
              //         <tr key={i} className="text-center">
              //           {children}
              //         </tr>
              //       );
              //     }
              //   }
              // }
              //________x______________
              // children.push(
              //   <td key={j}>
              //     {" "}
              //     {torneoInformacion.tournament.couples[i].user1Name}{" "}
              //     {torneoInformacion.tournament.couples[i].user1LastName}y{" "}
              //     {torneoInformacion.tournament.couples[i].user2Name}{" "}
              //     {torneoInformacion.tournament.couples[i].user2Name}
              //   </td>
              // );
              // m++;
              // children.push(
              //   <td key={j}>{miRondaInformacion.partidos[k].set1Couple1}</td>
              // );
              // m++;
              // children.push(
              //   <td key={j}>{miRondaInformacion.parejas[k].set2Couple1}</td>
              // );
              // m++;
              // children.push(
              //   <td key={j}>{miRondaInformacion.parejas[k].set3Couple1}</td>
              // );
              // m++;
              // tableJor.push(
              //   <tr key={i} className="text-center">
              //     {children}
              //   </tr>
              // );

              // children2.push(<td key={j}>Pareja 2 por hacer</td>);
              // m++;
              // children2.push(
              //   <td key={j}>{miRondaInformacion.partidos[k].set1Couple2}</td>
              // );
              // m++;
              // children2.push(
              //   <td key={j}>{miRondaInformacion.parejas[k].set2Couple2}</td>
              // );
              // m++;
              // children2.push(
              //   <td key={j}>{miRondaInformacion.parejas[k].set3Couple2}</td>
              // );
              // m++;
              // tableJor2.push(
              //   <tr key={i} className="text-center">
              //     {children2}
              //   </tr>
              // );
            }
          }
        }
      }

      return tableJor;
    };

    let table = [];
    let j = 0;
    let createRonda = () => {
      // Recorro todas las parejas del torneo
      for (
        var i = 0;
        i < torneoInformacion.tournament.couples.length - 1;
        i++
      ) {
        //let children = [];
        console.log(
          "couple1",
          torneoInformacion.tournament.couples[i].user1Id,
          "couple2",
          torneoInformacion.tournament.couples[i].user2Id,
          "user",
          user.id
        );
        // Veo la pareja a la que pertenezco y cojo mi grupo
        if (
          torneoInformacion.tournament.couples[i].user1Id === user.id ||
          torneoInformacion.tournament.couples[i].user2Id === user.id
        ) {
          let grupo = torneoInformacion.tournament.couples[i].grupoActual;

          // Desde la información de la ronda, recorro las parejas
          for (var k = 0; k < miRondaInformacion.parejas.length - 1; k++) {
            // Cuando veo una pareja que pertenece a mi grupo, la cojo
            if (miRondaInformacion.parejas[k].grupoActual === grupo) {
              let children = [];

              j++;
              children.push(<td key={j}>//TODO</td>);
              j++;
              //Tengo que hacer el getUser1Id !!!!
              children.push(
                <td key={j} className="text-left">
                  {miRondaInformacion.parejas[k].user1Name}{" "}
                  {miRondaInformacion.parejas[k].user1LastName} y{" "}
                  {miRondaInformacion.parejas[k].user2Name}{" "}
                  {miRondaInformacion.parejas[k].user2LastName}
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
              table.push(
                <tr key={i} className="text-center">
                  {children}
                </tr>
              );
            }
          }
        }
        console.log("table: ", table);
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
              <th>PJ </th>
              <th>PG</th>
              <th>PP</th>
              <th>SG</th>
              <th>SP</th>
              <th>JG</th>
              <th>JP</th>
              <th>Diferencia sets </th>
              <th>Diferencia juegos </th>
            </tr>
          </thead>
          <tbody>{createRonda()}</tbody>
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
        <p className="titulillos">Información de tu ronda y grupo</p>

        <h3>Ronda {torneoInformacion.tournament.rondaActual}</h3>
        {tablaRondaContent}

        <h3>Jornadas</h3>
        {tablaJornadaContent}
      </div>
    );
  }
}

Clasificacion.propTypes = {
  torneoInfo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { miRondaInfo, infoTorneoComenzadoParticipo }
)(Clasificacion);
