import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import { Button } from "react-bootstrap";
import "../../assets/Style.css";

import {
  miRondaInfo,
  subirResultado,
  confirmarResultado
} from "../../actions/torneoInfoAction";

class ConfirmacionResultado extends Component {
  constructor() {
    super();
    this.state = {
      sets: "",
      set1c1: "",
      set1c2: "",
      set2c1: "",
      set2c2: "",
      set3c1: "",
      set3c2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onConfirmResult = this.onConfirmResult.bind(this);
  }
  componentDidMount() {
    console.log(this.props.match.params);
    const { torneoInformacion } = this.props.torneoInfo;
    console.log(torneoInformacion);
    this.props.miRondaInfo(torneoInformacion);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    let arraySets = [];
    arraySets.push(this.state.set1c1);
    arraySets.push(this.state.set2c1);
    arraySets.push(this.state.set3c1);
    arraySets.push(this.state.set1c2);
    arraySets.push(this.state.set2c2);
    arraySets.push(this.state.set3c2);
    const resultado = {
      sets: arraySets
    };
    const { partidoId, id } = this.props.match.params;

    console.log("datos q envio a actions", arraySets);
    console.log("Errores: ", this.state.errors);
    this.props.subirResultado(partidoId, id, resultado, this.props.history);
  }
  onConfirmResult() {
    console.log("he confirmado el resultado");
    const { partidoId, id } = this.props.match.params;

    this.props.confirmarResultado(partidoId, id, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let ResultadoContent;
    const { id, partidoId } = this.props.match.params;
    let idPartido = partidoId;
    let partido = [];
    console.log("id del partido en params", this.props.match.params);
    const {
      torneoInformacion,
      loadingRonda,
      miRondaInformacion
    } = this.props.torneoInfo;
    const { error } = this.state.errors;
    if (loadingRonda) {
      ResultadoContent = <Spinner />;
    } else {
      let pareja1 = null;
      let pareja2 = null;
      //   let partidoId = partidoId;
      console.log("idPartido", idPartido);
      console.log("partidos[0].id", miRondaInformacion.partidos[0].id);
      for (var i = 0; i < miRondaInformacion.partidos.length; i++) {
        console.log("ids", miRondaInformacion.partidos[i].id, idPartido);
        let idString = miRondaInformacion.partidos[i].id.toString();

        if (idPartido === idString) {
          console.log(
            "HOLA HAN COINCIDIDO",
            idPartido,
            miRondaInformacion.partidos[i].id
          );

          pareja1 = miRondaInformacion.partidos[i].couple1FullName;
          pareja2 = miRondaInformacion.partidos[i].couple2FullName;
          console.log(pareja1, pareja2);
          partido = miRondaInformacion.partidos[i];

          break;
        }
      }

      ResultadoContent = (
        <div className="container">
          <div>
            <div className="row">
              <div className="col text-center">{partido.couple1FullName}</div>
              <div className="col text-center">{partido.couple2FullName}</div>
            </div>
            <div className="row">
              <div className="col text-center">{partido.set1Couple1}</div>
              <div className="col text-center">{partido.set1Couple2}</div>
            </div>
            <div className="row">
              <div className="col text-center">{partido.set2Couple1}</div>
              <div className="col text-center">{partido.set2Couple2}</div>
            </div>
            <div className="row">
              <div className="col text-center">{partido.set3Couple1}</div>
              <div className="col text-center">{partido.set3Couple2}</div>
            </div>

            <Button
              variant="outline-danger"
              className="btn  mt-4 btn-verde"
              onClick={this.onConfirmResult.bind(this)}
              className="btn"
            >
              Confirma el resultado
            </Button>
          </div>

          <p>
            Si el resultado no es el acorde, sube aquí el resultado actualizado
          </p>
          <p>Recuerda, si no has jugado tercer set pon 0-0.</p>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col"> {pareja1}</div>
              <div className="col"> {pareja2}</div>
            </div>
            <div className="row">
              <div className="col">
                {" "}
                <TextFieldGroup
                  placeholder="Set 1"
                  name="set1c1"
                  value={this.state.set1c1}
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                {" "}
                <TextFieldGroup
                  placeholder="Set 1"
                  name="set1c2"
                  value={this.state.set1c2}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <TextFieldGroup
                  placeholder="Set 2"
                  name="set2c1"
                  value={this.state.set2c1}
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                {" "}
                <TextFieldGroup
                  placeholder="Set 2"
                  name="set2c2"
                  value={this.state.set2c2}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                {" "}
                <TextFieldGroup
                  placeholder="Set 3"
                  name="set3c1"
                  value={this.state.set3c1}
                  onChange={this.onChange}
                />
              </div>
              <div className="col">
                {" "}
                <TextFieldGroup
                  placeholder="Set 3"
                  name="set3c2"
                  value={this.state.set3c2}
                  onChange={this.onChange}
                />
              </div>
            </div>

            <input type="submit" className="btn  btn-block mt-4 btn-verde" />
            <p className="errores">{error ? error.error.toString() : null}</p>
          </form>
        </div>
      );
    }
    return (
      <div className="info-torneo">
        <div className="container">
          <h2>Sube el resultado de tu partido</h2>

          {ResultadoContent}
        </div>
      </div>
    );
  }
}
ConfirmacionResultado.propTypes = {
  torneoInfo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  miRondaInfo: PropTypes.func.isRequired,
  subirResultado: PropTypes.func.isRequired,
  confirmarResultado: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo,
  auth: state.auth,
  match: state.match,
  errors: state.errors
});

export default connect(mapStateToProps, {
  miRondaInfo,
  subirResultado,
  confirmarResultado
})(withRouter(ConfirmacionResultado));
