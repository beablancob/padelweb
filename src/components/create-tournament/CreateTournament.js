import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createTournament } from '../../actions/torneosActivosAdminActions';

class CreateTournament extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nparticipants: '',
      privOrpub: '',
      limitDate: '',
      url: '',
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
      nparticipants: this.state.nparticipants,
      privOrpub: this.state.privOrpub,
      limitDate: this.state.limitDate,
      url: this.state.url,

    };
    //history sirve para redirigir. Para que funcione history tenemos que añadir withRouter en el componente que exportamos
    this.props.createTournament(tournamentData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;


    //Select options for type of tournament
    const options2 = [
      { label: '6', value: '6' },
      { label: '8', value: '8' },
      { label: '10', value: '10' },
      { label: '12', value: '12' },
      { label: '14', value: '14' },
      { label: '16', value: '16' },
      { label: '18', value: '18' },
      { label: '20', value: '20' },
      { label: '22', value: '22' },
      { label: '24', value: '24' },
      { label: '26', value: '26' },
      { label: '28', value: '28' },
      { label: '30', value: '30' },
      { label: '32', value: '32' },
      { label: '34', value: '34' },
      { label: '36', value: '36' },
      { label: '38', value: '38' },
      { label: '40', value: '40' },
      { label: '42', value: '42' },
      { label: '44', value: '44' },
      { label: '46', value: '46' },
      { label: '48', value: '48' },
      { label: '50', value: '50' }

    ];

    // Select options for status
    const options = [
      { label: 'Privado', value: 'Privado' },
      { label: 'Público', value: 'Público' }
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
                  error={errors.name}
                />
                <SelectListGroup
                  name="nparticipants"
                  value={this.state.nparticipants}
                  onChange={this.onChange}
                  options={options2}
                  error={errors.nparticipants}
                  info="Número de participantes"
                />
                <SelectListGroup
                  name="privOrpub"
                  value={this.state.privOrpub}
                  onChange={this.onChange}
                  options={options}
                  error={errors.privOrpub}
                  info="Elige el tipo de torneo que quieres"
                />
                <TextFieldGroup
                  placeholder="Fecha límite para apuntarse"
                  name="limitDate"
                  value={this.state.limitDate}
                  onChange={this.onChange}
                  error={errors.limitDate}
                  info="Mirar cómo meter una fecha"
                />

                <TextFieldGroup
                  placeholder="TODO: URL!!! NO ES UN INPUT OBV"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Esto va a ser la url para que envíes a tus compañeros"
                />

                <input
                  type="submit"
                  value="Enviar"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateTournament.propTypes = {
  tournament: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps, { createTournament })(
  withRouter(CreateTournament)
);

//TODO: mirar la fecha!!!! tipo fecha??? calendario ahi??