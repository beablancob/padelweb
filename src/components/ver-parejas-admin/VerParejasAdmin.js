import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../assets/Style.css";
import { withRouter } from "react-router-dom";
import Spinner from "../common/Spinner";
import { obtenerParejas } from "../../actions/torneosActivosAdminActions";

class VerParejasAdmin extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    this.props.obtenerParejas(id);
  }

  render() {
    //const { torneoInformacion, loadingTorneo } = this.props.torneoInfo;
    const { parejas, loadingP } = this.props.torneosActivosAdmin;

    console.log(">>>>>>>>>>>>>>", parejas, loadingP);

    let parejasContent;
    console.log("LOADING PAREJAS", loadingP);

    if (loadingP) {
      console.log("kjsdhfiusalfhgsuiflfghsjdhfjash", loadingP);
      parejasContent = <Spinner />;
    } else {
      if (parejas.msg) {
        parejasContent = <p>No hay parejas apuntadas de momento</p>;
      } else {
        console.log(
          "**********************Estoy en parejas, info del torneo ",
          parejas
        );
        console.log(parejas.nombres);

        let table = [];
        let j = 0;
        let m = 0;
        let createTable = () => {
          for (var i = 0; i < parejas.nombres.length; i++) {
            let children = [];
            let k = 0;

            if (k === 0) {
              m++;
              children.push(
                <td key={j} className="text-center">
                  {m}
                </td>
              );
              console.log("----------------", parejas.nombres[i]);
              k++;
              i++;
            }
            if (k === 1) {
              console.log("HOLA");
              children.push(
                <td key={j} className="text-center">
                  {parejas.nombres[i]}
                </td>
              );
              k++;
              i++;
            }
            if (k === 2) {
              children.push(
                <td key={j} className="text-center">
                  {parejas.nombres[i]}
                </td>
              );
              k = 0;
              //  i++;
            }
            console.log("i: ", i);
            console.log(parejas.nombres.length);
            console.log("user1name", i, parejas.nombres[i]);
            // children.push(
            //   <td key={j} className="text-center">
            //     {parejas.nombres[i]}
            //   </td>
            // );

            j++;

            table.push(
              <tr key={i} className="table">
                {children}
              </tr>
            );
          }
          console.log("table en parejas", table);
          return table;
        };

        parejasContent = (
          <div>
            <table>
              <thead>
                <tr>
                  <th className="text-center"></th>

                  <th className="text-center">Jugador 1 </th>
                  <th className="text-center">Jugador 2 </th>
                </tr>
              </thead>
              <tbody>{createTable()}</tbody>
            </table>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="info-torneo">
          <div className="container">
            <div className="col-md-8 m-auto">
              <h2 className="display-4 text-center">
                Lista de parejas apuntadas
              </h2>

              {parejasContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
VerParejasAdmin.propTypes = {
  torneosActivosAdmin: PropTypes.object.isRequired,
  torneoInfo: PropTypes.object.isRequired,

  match: PropTypes.object.isRequired,
  obtenerParejas: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  torneoInfo: state.torneoInfo,
  torneosActivosAdmin: state.torneosActivosAdmin,
  match: state.match
});

export default connect(mapStateToProps, { obtenerParejas })(
  withRouter(VerParejasAdmin)
);
