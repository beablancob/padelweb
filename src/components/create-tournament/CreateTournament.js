import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListBoolean from "../common/SelectListBoolean";

import { createTournament } from "../../actions/torneosActivosAdminActions";

class CreateTournament extends Component {
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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const tournamentData = {
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
    //history sirve para redirigir. Para que funcione history tenemos que añadir withRouter en el componente que exportamos
    this.props.createTournament(tournamentData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { error } = this.state.errors;
    console.log("******************+", error);

    const options2 = [
      { label: "Si", value: true },
      { label: "No", value: false }
    ];

    // Select options for type of tournament
    const options1 = [
      { label: "Público", value: true },
      { label: "Privado", value: false }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Crea tu propio torneo</h1>
              <p className="lead text-center">
                Rellena el siguiente formulario
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Nombre del torneo"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Elige el número de parejas que van a participar"
                  name="numeroParejas"
                  type="number"
                  min="2"
                  max="200"
                  value={this.state.numeroParejas}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Elige el número de parejas por grupo que va a haber en cada ronda"
                  name="parejasPorGrupo"
                  type="number"
                  min="2"
                  max="100"
                  value={this.state.parejasPorGrupo}
                  onChange={this.onChange}
                  info="Parejas por grupo"
                />
                <SelectListBoolean
                  name="publico"
                  value={this.state.publico}
                  onChange={this.onChange}
                  options={options1}
                  info="Elige el tipo de torneo que quieres"
                />
                <TextFieldGroup
                  placeholder="Puntos por partido ganado"
                  name="puntosPG"
                  value={this.state.puntosPG}
                  onChange={this.onChange}
                  info="Puntos por PG"
                />
                <TextFieldGroup
                  placeholder="Puntos por partido perdido"
                  name="puntosPP"
                  type="number"
                  value={this.state.puntosPP}
                  onChange={this.onChange}
                  info="Puntos por PP"
                />
                <SelectListBoolean
                  name="idaYvuelta"
                  valueb={this.state.idaYvuelta}
                  onChange={this.onChange}
                  options={options2}
                  info="Elige si quieres que los partidos sean de ida y vuelta"
                />
                <TextFieldGroup
                  placeholder="Elige el número de rondas que va a tener el torneo"
                  name="numeroRondas"
                  type="number"
                  min="1"
                  max="500"
                  value={this.state.numeroRondas}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Elige el número de parejas que suben al terminar una ronda"
                  name="parejasSuben"
                  type="number"
                  min="1"
                  max="20"
                  value={this.state.parejasSuben}
                  onChange={this.onChange}
                />
                <input
                  type="submit"
                  value="Enviar"
                  className="btn btn-info btn-block mt-4"
                />
                {/* <p className="errores">
                  hola{error ? error.error.toString() : null}
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateTournament.propTypes = {
  tournament: PropTypes.object,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createTournament })(
  withRouter(CreateTournament)
);

//TODO: mirar la fecha!!!! tipo fecha??? calendario ahi??

/* <TextFieldGroup
                  placeholder="Fecha límite para apuntarse"
                  name="limitDate"
                  value={this.state.limitDate}
                  onChange={this.onChange}
                  error={errors.limitDate}
                  info="Mirar cómo meter una fecha"
                /> */
