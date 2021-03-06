import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListBoolean from "../common/SelectListBoolean";
import Spinner from "../common/Spinner";
import { Button } from "reactstrap";

import {
  selectEditarTorneo,
  torneoEditado,
  eliminarTorneo,
  comenzarTorneo
} from "../../actions/torneosActivosAdminActions";

class EditarTorneo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      numeroParejas: "",
      parejasPorGrupo: "",
      publico: true,
      puntosPG: "",
      puntosPP: "",
      idaYvuelta: false,
      numeroRondas: "",
      parejasSuben: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.onStartClick = this.onStartClick.bind(this);
  }
  componentDidMount() {
    console.log("ESTOY EN COMPONENT DID MOUNTTT");
    console.log(this.props.match);
    const { id } = this.props.match.params;
    this.props.selectEditarTorneo(id);
  }
  componentWillReceiveProps(nextProps) {
    console.log("ESTOY EN WILL RECEIVE PROPS", nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.torneosActivosAdmin.torneoAdmin) {
      const torneo = nextProps.torneosActivosAdmin.torneoAdmin.tournament;

      // Set component fields state
      this.setState({
        name: torneo.name,
        numeroParejas: torneo.numeroParejas,
        parejasPorGrupo: torneo.parejasPorGrupo,
        publico: torneo.publico,
        puntosPG: torneo.puntosPG,
        puntosPP: torneo.puntosPP,
        idaYvuelta: torneo.idaYvuelta,
        numeroRondas: torneo.numeroRondas,
        parejasSuben: torneo.parejasSuben
      });
    }
  }

  onDeleteClick(e) {
    const torneoId = this.props.torneosActivosAdmin.torneoAdmin.tournament.id;
    console.log(torneoId);
    this.props.eliminarTorneo(torneoId, this.props.history);
  }
  onStartClick(e) {
    const torneoId = this.props.torneosActivosAdmin.torneoAdmin.tournament.id;
    console.log(torneoId);
    this.props.comenzarTorneo(torneoId, this.props.history);
  }

  onSubmit(e) {
    e.preventDefault();
    const torneoId = this.props.torneosActivosAdmin.torneoAdmin.tournament.id;
    const torneo = {
      name: this.state.name,
      numeroParejas: this.state.numeroParejas,
      parejasPorGrupo: this.state.parejasPorGrupo,
      publico: this.state.publico,
      puntosPG: this.state.puntosPG,
      puntosPP: this.state.puntosPP,
      idaYvuelta: this.state.idaYvuelta,
      numeroRondas: this.state.numeroRondas,
      parejasSuben: this.state.parejasSuben
    };
    console.log("TORNEO IDDDDDD", torneoId);
    this.props.torneoEditado(torneo, torneoId, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    console.log("ESTOY EN EL RENDER");
    const { errors } = this.state;
    const { loading2, torneoAdmin } = this.props.torneosActivosAdmin;
    console.log("params", this.props.match.params);
    console.log("+++++++++++", torneoAdmin);
    let editContent;
    if (loading2) {
      console.log("loading");
      editContent = <Spinner />;
    } else {
      // Select options of idaYvuelta
      let options2;
      if (torneoAdmin.tournament.idaYvuelta === false) {
        options2 = [
          { label: "No", value: false },
          { label: "Si", value: true }
        ];
      } else {
        options2 = [
          { label: "Si", value: true },
          { label: "No", value: false }
        ];
      }
      // Select options of type of tournament
      let options1;
      if (torneoAdmin.tournament.publico === true) {
        options1 = [
          { label: "Público", value: true },
          { label: "Privado", value: false }
        ];
      } else {
        options1 = [
          { label: "Privado", value: false },
          { label: "Público", value: true }
        ];
      }

      let torneoId = torneoAdmin.tournament.id;
      editContent = (
        <div>
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edita tu torneo</h1>
              <p className="lead text-center">
                Rellena el siguiente formulario
              </p>
              <div>
                <form onSubmit={this.onSubmit}>
                  <label> Nombre del torneo</label>
                  <TextFieldGroup
                    placeholder={this.state.name}
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    error={errors.name}
                  />

                  <label> Numero de parejas máximo del torneo</label>
                  <TextFieldGroup
                    placeholder="numero de parejas"
                    name="numeroParejas"
                    type="number"
                    min="2"
                    max="200"
                    value={this.state.numeroParejas}
                    onChange={this.onChange}
                    error={errors.numeroParejas}
                  />

                  <label>Número de parejas por grupo</label>
                  <TextFieldGroup
                    placeholder="Elige el número de parejas por grupo que va a haber en cada ronda"
                    name="parejasPorGrupo"
                    type="number"
                    min="2"
                    max="100"
                    value={this.state.parejasPorGrupo}
                    onChange={this.onChange}
                    error={errors.parejasPorGrupo}
                  />

                  <label>Elige el tipo de torneo que quieres</label>
                  <SelectListBoolean
                    name="publico"
                    value={this.state.publico}
                    onChange={this.onChange}
                    options={options1}
                    error={errors.publico}
                  />

                  <label> Puntos por partido ganado</label>
                  <TextFieldGroup
                    placeholder="Puntos por partido ganado"
                    name="puntosPG"
                    value={this.state.puntosPG}
                    onChange={this.onChange}
                    error={errors.puntosPG}
                  />

                  <label> Puntos por partido perdido</label>
                  <TextFieldGroup
                    placeholder="Puntos por partido perdido"
                    name="puntosPP"
                    type="number"
                    value={this.state.puntosPP}
                    onChange={this.onChange}
                    error={errors.puntosPP}
                  />

                  <label>
                    {" "}
                    Elige si quieres que los partidos sean de ida y vuelta
                  </label>
                  <SelectListBoolean
                    name="idaYvuelta"
                    valueb={this.state.idaYvuelta}
                    onChange={this.onChange}
                    options={options2}
                    error={errors.idaYvuelta}
                  />

                  <label> Número de rondas que va a tener el torneo</label>
                  <TextFieldGroup
                    placeholder="Elige el número de rondas que va a tener el torneo"
                    name="numeroRondas"
                    type="number"
                    min="1"
                    max="500"
                    value={this.state.numeroRondas}
                    onChange={this.onChange}
                    error={errors.numeroRondas}
                  />

                  <label>
                    {" "}
                    Número de parejas que suben al terminar una ronda
                  </label>
                  <TextFieldGroup
                    placeholder="Elige el número de parejas que suben al terminar una ronda"
                    name="parejasSuben"
                    type="number"
                    min="1"
                    max="20"
                    value={this.state.parejasSuben}
                    onChange={this.onChange}
                    error={errors.parejasSuben}
                  />
                  <input
                    type="submit"
                    value="Enviar"
                    className="btn btn-info btn-block mt-4 btn-verde"
                  />
                </form>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: "60px" }} />
          <div className="row">
            <div className="col-md-6">
              <Button
                style={{ marginLeft: "170px" }}
                color="danger"
                onClick={this.onDeleteClick.bind(this)}
                className="btn"
              >
                Eliminar torneo
              </Button>
            </div>
            <div className="col-md-6">
              <Button
                style={{ marginLeft: "170px" }}
                color="success"
                onClick={this.onStartClick.bind(this, torneoId)}
                className="btn"
              >
                Comenzar torneo
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="container">{editContent}</div>
      </div>
    );
  }
}

EditarTorneo.propTypes = {
  match: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  torneosActivosAdmin: PropTypes.object.isRequired,
  selectEditarTorneo: PropTypes.func.isRequired,
  torneoEditado: PropTypes.func.isRequired,
  eliminarTorneo: PropTypes.func.isRequired,
  comenzarTorneo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  match: state.match,
  errors: state.errors,
  torneosActivosAdmin: state.torneosActivosAdmin
});

export default connect(mapStateToProps, {
  selectEditarTorneo,
  torneoEditado,
  eliminarTorneo,
  comenzarTorneo
})(withRouter(EditarTorneo));

//TODO: mirar la fecha!!!! tipo fecha??? calendario ahi??

/* <TextFieldGroup
                  placeholder="Fecha límite para apuntarse"
                  name="limitDate"
                  value={this.state.limitDate}
                  onChange={this.onChange}
                  error={errors.limitDate}
                  info="Mirar cómo meter una fecha"
                /> */

/*
                 <div style={{ marginBottom: "60px" }} />
          <div className="row">
            <button
              style={{ marginLeft: "200px" }}
              onClick={this.onDeleteClick.bind(this, torneoAdmin.tournament.id)}
              className="btn btn-danger"
            >
              Eliminar torneo
            </button>
          </div>
                */
