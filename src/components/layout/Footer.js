//rfc utilizamos un functional component porque no vamos a necesitar ningun metodo que cambie su ciclo de vida ni nada
import React from "react";
import "../../assets/Style.css";

export default function Footer() {
  return (
    <footer className=" mt-5 p-4 text-center footer">
      Copyright &copy; {new Date().getFullYear()} Torneos de pádel. BBB
    </footer>
  );
}
