// YA NO ME HACE FALTA ESTE COMPONENTE
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import { avanzarRonda } from "../../actions/torneosActivosAdminActions";
import { Button } from "react-bootstrap";
import "../../assets/Style.css";

class Grupos extends Component {
  constructor(props) {
    super(props);
    this.onAvanzarRondaClick = this.onAvanzarRondaClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onAvanzarRondaClick(id) {
    this.props.avanzarRonda(id, this.props.history);
  }
  render() {
    const { loading2, torneoAdmin } = this.props.torneosActivosAdmin;

    console.log(
      ">>>>>>>>>>>><Estoy en Grupos, info de la ronda<<<<<<<<<<<<<",
      torneoAdmin
    );
    const { id } = this.props.match.params;

    let gruposContent;

    if (loading2) {
      gruposContent = <Spinner />;
    } else {
      if (torneoAdmin === null) {
        gruposContent = <p>Todavía no hay información del torneo</p>;
      } else {
        console.log("HEY YOU", torneoAdmin.tournament);
        let couples = torneoAdmin.tournament.couples;
        let numGrupos;

        numGrupos = couples[0].grupoActual;

        for (let i = 0; i < couples.length - 1; i++) {
          if (couples[i + 1].grupoActual > numGrupos) {
            console.log(
              "couple, numgrupo",
              couples[i + 1].grupoActual,
              numGrupos
            );
            numGrupos = couples[i + 1].grupoActual;
          }
          console.log(">>>>>>>>>>>>>>>>>>>>>>1111", numGrupos);
        }
        numGrupos += 1;
        console.log(">>>>>>>>>>>>>>>>>>>>>>", numGrupos);

        let createTable = () => {
          let table = [];
          let k = 0;
          let m = 0;

          for (let i = 0; i < numGrupos; i++) {
            let children = [];
            let numGrupo = i + 1;
            let myLink =
              "/ver-torneo/" + id + "/grupos/" + numGrupo + "/clasificacion";
            children.push(
              <td key={k} className="grupos">
                <Link className="link-button" to={myLink}>
                  {`Grupo ${numGrupo}`}
                </Link>
              </td>
            );
            k++;

            k = 0;
            table.push(<tr key={m}>{children}</tr>);
            m++;
          }
          m = 0;
          return table;
        };

        let partidosJugados = true;
        // let todosPartidos = torneoAdmin.tournament.partidos;
        // for (let i = 0; i < todosPartidos.length; i++) {
        //   if (
        //     torneoAdmin.tournament.rondaActual === todosPartidos[i].numeroRonda
        //   ) {
        //     while (partidosJugados === true) {
        //       if (todosPartidos[i].jugado === false) {
        //         partidosJugados = false;
        //       }
        //     }
        //   }
        // }

        console.log(
          "*****************+ partidosJugados",
          torneoAdmin.tournament,
          partidosJugados
        );
        gruposContent = (
          <div className="row">
            <div className="col">
              <table>
                <tbody>{createTable()}</tbody>
              </table>
            </div>

            <div className="col">
              <p>COMPROBAR SI SE HAN JUGADO TODOS LOS PARTIDOS DE LA RONDA</p>
              <Button
                variant="outline-info"
                color="success"
                onClick={this.onAvanzarRondaClick.bind(this, id)}
              >
                Avanzar ronda
              </Button>
            </div>
          </div>
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
  torneosActivosAdmin: PropTypes.object.isRequired,
  avanzarRonda: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  torneosActivosAdmin: state.torneosActivosAdmin
});

export default connect(mapStateToProps, { avanzarRonda })(withRouter(Grupos));
