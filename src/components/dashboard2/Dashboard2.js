import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class Dashboard2 extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;

    let dashboardContent;

    let createTable = () => {
      let table = [];

      // Outer loop to create parent
      for (let i = 0; i < 3; i++) {
        let children = [];
        //Inner loop to create children
        for (let j = 0; j < 5; j++) {
          children.push(<td>{`Column ${j + 1}`}</td>);
        }
        //Create the parent and add the children
        table.push(<tr>{children}</tr>);
      }
      return table;
    };

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col md-12">
              <h1 className="display-4">Dashboard</h1>
              <table>{createTable()}</table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Dashboard2.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard2);
