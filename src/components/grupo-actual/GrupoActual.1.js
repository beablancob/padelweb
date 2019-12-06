import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../assets/Style.css";
import { withRouter } from "react-router-dom";
import Spinner from "../common/Spinner";
import { miRondaInfo } from "../../actions/torneoInfoAction";
import { Button, ButtonToolBar, Modal } from "react-bootstrap";

class GrupoActual extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      errors: {}
    };
    this.handleModal = this.handleModal.bind(this);
    this.onAceptar = this.onAceptar.bind(this);
    this.onRechazar = this.onRechazar.bind(this);
  }
  handleModal() {
    this.setState({ show: true });
  }
  onAceptar(partidoId) {}
  onRechazar(partidoId) {}

  // TODO: TENGO QUE PEDIR LA INFORMACIÓN DE MI RONDA QUE ES DONDE ESTÁN LOS PARTIDOS!!
  componentDidMount() {
    const { torneoInformacion } = this.props.torneoInfo;
    let torneoData = torneoInformacion;
    console.log("DIDD", torneoData);

    this.props.miRondaInfo(torneoData);
  }
  render() {
    const {
      torneoInformacion,
      loadingTorneo,
      loadingRonda,
      miRondaInformacion
    } = this.props.torneoInfo;
    const { user } = this.props.auth;
    console.log("miRonda", "loading ronda", miRondaInformacion, loadingRonda);
    let parejasContent;
    let miParejaId;

    if (loadingTorneo) {
      parejasContent = <Spinner />;
    } else {
      if (loadingRonda) {
        parejasContent = <Spinner />;
      } else {
        console.log(torneoInformacion.tournament.couples);
        let torneo = torneoInformacion.tournament;
        let miGrupo;
        let j = 0;
        let m = 50;

        //let ronda = miRondaInformacion;
        let parejas = miRondaInformacion.parejas;
        let partidos = miRondaInformacion.partidos;

        for (var i = 0; i < parejas.length; i++) {
          if (
            parejas[i].user1Id === user.id ||
            parejas[i].user2Id === user.id
          ) {
            miGrupo = parejas[i].grupoActual;
            miParejaId = parejas[i].id;

            console.log("Tengo grupo de mi usuario: ", miGrupo, miParejaId);

            let table = [];
            let createTable = () => {
              for (var i = 0; i < partidos.length - 1; i++) {
                console.log(
                  " numeros de grupo pareja mio",
                  partidos[i].numeroGrupo,
                  miGrupo
                );
              }
              for (var i = 0; i < partidos.length; i++) {
                console.log("user1name", i, partidos[i].couple1FullName);
                console.log("user2name", i, partidos[i].couple2FullName);
                let children = [];

                if (partidos[i].numeroGrupo === miGrupo) {
                  children.push(
                    <td key={j} className="td-pareja">
                      {partidos[i].couple1FullName}
                    </td>
                  );
                  j++;
                  console.log(
                    "----------------------",
                    partidos[i].parejaEditedId
                  );

                  // 1.1. no pertenezco a la pareja
                  if (
                    miParejaId !== partidos[i].couple1Id &&
                    miParejaId !== partidos[i].couple2Id
                  ) {
                    console.log("pareja", miParejaId, partidos[i].couple1Id);
                    console.log("partido jugado:", partidos[i].jugado);
                    if (
                      partidos[i].jugado === null ||
                      partidos[i].jugado === false
                    ) {
                      children.push(
                        <td key={j} className="text-center">
                          Partido sin jugar
                        </td>
                      );
                      j++;
                    } else {
                      children.push(
                        <td key={j} className="text-center">
                          {partidos[i].set1Couple1}-{partidos[i].set1Couple2}{" "}
                          {partidos[i].set2Couple1}-{partidos[i].set2Couple2}{" "}
                          {partidos[i].set3Couple1}-{partidos[i].set3Couple2}
                        </td>
                      );
                      j++;
                    }
                  } else {
                    // 1.2. Si pertenezco a la pareja

                    // 2.1 Si parejaEditedId no tiene valor, boton para subir resultado
                    if (partidos[i].parejaEditedId === null) {
                      let myLink =
                        "/torneo-apuntado-info/" +
                        torneo.id +
                        "/grupo-actual/" +
                        partidos[i].id +
                        "/subir-resultado";
                      children.push(
                        <td key={j} className="td-link">
                          <Link className="resultado-button" to={myLink}>
                            Subir resultado
                          </Link>
                        </td>
                      );
                      j++;

                      //Si la parejaEditedId no está a null miramos si se ha confirmado el resultado
                    } else {
                      if (miParejaId === partidos[i].parejaEditedId) {
                        if (
                          partidos[i].jugado === null ||
                          partidos[i].jugado === false
                        ) {
                          console.log("HOLA");
                          children.push(
                            <td key={j} className="td-link">
                              Falta confirmación del resultado
                            </td>
                          );
                          j++;
                        } else {
                          children.push(
                            <td key={j} className="text-center">
                              {partidos[i].set1Couple1}-
                              {partidos[i].set1Couple2}{" "}
                              {partidos[i].set2Couple1}-
                              {partidos[i].set2Couple2}{" "}
                              {partidos[i].set3Couple1}-
                              {partidos[i].set3Couple2}
                            </td>
                          );
                          j++;
                        }
                      } else {
                        if (
                          partidos[i].jugado === null ||
                          partidos[i].jugado === false
                        ) {
                          console.log("HOLA");
                          let myLink =
                            "/torneo-apuntado-info/" +
                            torneo.id +
                            "/grupo-actual/" +
                            partidos[i].id +
                            "/confirmacion-resultado";
                          children.push(
                            <td key={j} className="td-link">
                              <Link className="resultado-button" to={myLink}>
                                Confirma el resultado
                              </Link>
                            </td>
                          );
                          j++;
                        } else {
                          children.push(
                            <td key={j} className="text-center">
                              {partidos[i].set1Couple1}-
                              {partidos[i].set1Couple2}{" "}
                              {partidos[i].set2Couple1}-
                              {partidos[i].set2Couple2}{" "}
                              {partidos[i].set3Couple1}-
                              {partidos[i].set3Couple2}
                            </td>
                          );
                          j++;
                        }
                      }
                    }
                  }
                  children.push(
                    <td key={j} className="td-pareja">
                      {partidos[i].couple2FullName}
                    </td>
                  );

                  j++;
                  m++;
                  table.push(
                    <tr key={m} className="table">
                      {children}
                    </tr>
                  );
                  m++;
                }
              }

              console.log("table en parejas", table);
              return table;
            };

            parejasContent = (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th className="text-center">Pareja 1 </th>
                      <th className="text-center">Resultado</th>
                      <th className="text-center">Pareja 2 </th>
                    </tr>
                  </thead>
                  <tbody>{createTable()}</tbody>
                </table>
              </div>
            );
          }
        }
      }
    }

    return (
      <div className="info-torneo">
        <div className="container">
          <h2>Partidos</h2>

          {parejasContent}
        </div>
      </div>
    );
  }
}

GrupoActual.propTypes = {
  torneoInfo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  miRondaInfo: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo,
  auth: state.auth
});

export default connect(mapStateToProps, { miRondaInfo })(
  withRouter(GrupoActual)
);
