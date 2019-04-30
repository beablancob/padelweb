//rcc igual q navbar
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Organiza tus propios torneos de pádel.
                                </h1>
                                <p className="lead"> Apúntate, solo tienes que registrarte</p>
                                <hr />
                                <Link to="/register" className="btn btn-lg btn-info mr-2">Regístrate</Link>
                                <Link to="/login" className="btn btn-lg btn-light">Inicia sesión</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Landing
