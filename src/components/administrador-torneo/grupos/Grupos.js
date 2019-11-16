// YA NO ME HACE FALTA ESTE COMPONENTE
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import { withRouter } from "react-router-dom";
import { miRondaInfo } from "../../../actions/torneoInfoAction";

class Grupos extends Component {
  componentDidMount() {
    const { torneoInformacion } = this.props.torneoInfo;
    this.props.miRondaInfo(torneoInformacion);
  }
  render() {
    const {
      torneoInformacion,
      miRondaInformacion,
      loadingRonda
    } = this.props.torneoInfo;

    console.log(
      ">>>>>>>>>>>><Estoy en Grupos, info de la ronda<<<<<<<<<<<<<",
      miRondaInformacion,
      torneoInformacion
    );

    let gruposContent;

    if (loadingRonda) {
      gruposContent = <Spinner />;
    } else {
      if (miRondaInformacion === null) {
        gruposContent = <p>Todavía no hay información de la ronda</p>;
      } else {
        let createTable = () => {
          let table = [];
          let k = 0;
          let m = 0;

          for (let i = 0; i < miRondaInformacion.partidos.length; i++) {
            let children = [];
            for (let j = 0; j < 2; j++) {
              let myLink =
                "/torneo-apuntado-info/grupos/" +
                torneoInformacion.tournament.id +
                "/" +
                j;
              children.push(
                <td key={k}>
                  <Link className="link-button" to={myLink}>
                    {`Grupo ${j}`}
                  </Link>
                </td>
              );
              k++;
            }
            k = 0;
            table.push(<tr key={m}>{children}</tr>);
            m++;
          }
          m = 0;
          return table;
        };
        gruposContent = (
          <table>
            <tbody>{createTable()}</tbody>
          </table>
        );
      }
    }

    return (
      <div className="info-torneo">
        <div className="container">
          <h2>Lista de grupos de la ronda en juego</h2>
          {gruposContent}
        </div>
      </div>
    );
  }
}
Grupos.propTypes = {
  torneoInfo: PropTypes.object.isRequired,
  miRondaInfo: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo
});

export default connect(mapStateToProps, { miRondaInfo })(withRouter(Grupos));
