import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import { getAdminTournament } from "../../actions/torneosActivosAdminActions";
import {
  eliminarParejaAdmin,
  editarParejaTorneoAdmin
} from "../../actions/apuntarseTorneoAction";
import "../../assets/Style.css";
import Spinner from "../common/Spinner";

class EditarPareja extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailUser2: "",
      emailUser1: "",
      error: ""
    };
    // this.props.RegistrarPareja.loading = true;
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  componentDidMount() {
    const { id, idPareja } = this.props.match.params;
    console.log("-------------------x------------------- RegistrarPareja");

    console.log("DID MOUNT", this.props.match);

    this.props.getAdminTournamet(id);
    console.log("DIDDDDDD", id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ error: nextProps.error });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const { torneoAdmin } = this.props.torneosActivosAdmin;
    const { id, idPareja } = this.props.match.params;

    const emails = {
      emailUser1: this.state.emailUser1,
      emailUser2: this.state.emailUser2
    };
    console.log("parámetros:", emails, id, idPareja);

    //history sirve para redirigir. Para que funcione history tenemos que añadir withRouter en el componente que exportamos
    //console.log("El registerCode del torneo es: ", registerCodeData);
    this.props.registrarAdminTorneo(id, idPareja, emails, this.props.history);
  }
  onDeleteClick(e) {
    e.preventDefault();
    this.props.eliminarParejaAdmin(id, idPareja, this.props.history);
  }
  render() {
    const { torneoAdmin, loading2 } = this.props.torneosActivosAdmin;
    const { error } = this.state;
    let torneo = torneoAdmin.tournament;

    let apuntarseContent;
    if (loadingAdmin) {
      console.log("loading");
      apuntarseContent = <Spinner />;
    } else {
      console.log(
        "-------------------x------------------- apuntarseNO MAS LOADING"
      );
      console.log("El torneo seleccionado es:", torneo);
      for (i = 0; i < torneo.couples.length; i++) {
        if (torneo.couples[i].id === idPareja) {
          // ****************************************** NO TENGO LOS EMAILSSSSSS
          //let email1 = torneo.couples[i].
        }
      }
      apuntarseContent = (
        <div>
          <h1 className="display-4 text-center">Edita la pareja</h1>
          <p className="lead text-center">
            Rellena el email de las parejas, recuerda que tienen que estar
            registrados en la plataforma.
          </p>
          <form onSubmit={this.onSubmit.bind(this)}>
            <TextFieldGroup
              placeholder="Nombre del jugador 1"
              name="emailUser1"
              value={this.state.emailUser1}
              onChange={this.onChange}
              error={error}
              info="pareja1@ejemplo.com"
            />
            <TextFieldGroup
              placeholder="Nombre del jugador 2"
              name="emailUser2"
              value={this.state.emailUser2}
              onChange={this.onChange}
              error={error}
              info="pareja2@ejemplo.com"
            />
            <input
              type="submit"
              value="Enviar"
              className="btn btn-info btn-block mt-4"
            />
          </form>
          <div style={{ marginBottom: "60px" }} />
          <div className="row">
            <button
              style={{ marginLeft: "200px" }}
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Eliminar mi cuenta
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="apuntarse-torneo">
        <div className="container">
          <div className="col-md-8 m-auto">{apuntarseContent}</div>
        </div>
      </div>
    );
  }
}

EditarPareja.propTypes = {
  eliminarParejaAdmin: PropTypes.func.isRequired,
  editarParejaTorneoAdmin: PropTypes.func.isRequired,
  getAdminTournament: PropTypes.func.isRequired,
  torneosActivosAdmin: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  error: PropTypes.object
};
const mapStateToProps = state => ({
  torneosActivosAdmin: state.torneosActivosAdmin,
  match: state.match,
  error: state.error
});
export default connect(mapStateToProps, {
  editarParejaTorneoAdmin,
  getAdminTournament,
  eliminarParejaAdmin
})(withRouter(EditarPareja));
