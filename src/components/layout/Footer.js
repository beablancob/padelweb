//rfc utilizamos un functional component porque no vamos a necesitar ningun metodo que cambie su ciclo de vida ni nada
import React from 'react'

export default function Footer() {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center">
            Copyright &copy; {new Date().getFullYear()} Torneos de pádel. BBB
        </footer>

    )
}
