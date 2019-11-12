import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListBoolean from "../common/SelectListBoolean";
import Spinner from "../common/Spinner";

import {
  selectEditarTorneo,
  torneoEditado,
  eliminarTorneo
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

  onDeleteClick(torneoId) {
    this.props.eliminarTorneo(torneoId, this.props.history);
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
    this.props.torneoEditado(torneo, torneoId);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    console.log("ESTOY EN EL RENDER");
    const { errors } = this.state;
    const { loading2, torneoAdmin } = this.props.torneosActivosAdmin;
    console.log("params", this.props.match.params);
    console.log(this.props.torneosActivosAdmin);
    let editContent;
    if (loading2) {
      console.log("loading");
      editContent = <Spinner />;
    } else {
      const options2 = [
        { label: "Si", value: true },
        { label: "No", value: false }
      ];

      // Select options for type of tournament
      const options1 = [
        { label: "Público", value: true },
        { label: "Privado", value: false }
      ];
      editContent = (
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
            placeholder={this.state.numeroParejas}
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

          <label> Elige si quieres que los partidos sean de ida y vuelta</label>
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

          <label> Número de parejas que suben al terminar una ronda</label>
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
            className="btn btn-info btn-block mt-4"
          />
        </form>
      );
    }

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edita tu torneo</h1>
              <p className="lead text-center">
                Rellena el siguiente formulario
              </p>
              {editContent}
            </div>
          </div>
        </div>
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
  eliminarTorneo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  match: state.match,

  errors: state.errors,
  torneosActivosAdmin: state.torneosActivosAdmin
});

export default connect(
  mapStateToProps,
  { selectEditarTorneo, torneoEditado, eliminarTorneo }
)(withRouter(EditarTorneo));

//TODO: mirar la fecha!!!! tipo fecha??? calendario ahi??

/* <TextFieldGroup
                  placeholder="Fecha límite para apuntarse"
                  name="limitDate"
                  value={this.state.limitDate}
                  onChange={this.onChange}
                  error={errors.limitDate}
                  info="Mirar cómo meter una fecha"
                /> */
