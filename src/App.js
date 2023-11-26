import "./App.css";
import reactlogo from "./imagenes/react-logo.png";
import awblogo from "./imagenes/awb-logo.jpg";
import alelogo from "./imagenes/ale-logo.jpg";
import Boton from "./componentes/Boton";
import Pantalla from "./componentes/Pantalla";
import BotonClear from "./componentes/BotonClear";
import { useState, useEffect } from "react";
import { evaluate } from "mathjs";
function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };
  const [input, setInput] = useState("");
  const agregarInput = (val) => {
    setInput(input + val);
  };
  const calcularResultado = () => {
    if (input) {
      setInput(evaluate(input));
    } else {
      alert("Por favor ingrese valores para realizar los cálculos.");
    }
  };
  const limpiarInput = () => {
    setInput("");
  };
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      const allowedKeys = /[0-9+\-*/.=]|Enter|Backspace|Delete|Escape/;

      if (key.match(allowedKeys)) {
        event.preventDefault();
        switch (key) {
          case "Enter":
            calcularResultado();
            break;
          case "Backspace":
            setInput((prevInput) => prevInput.slice(0, -1)); // Usar prevInput para eliminar caracteres
            break;
          case "Delete":
          case "Escape":
            limpiarInput();
            break;
          default:
            if (key.match(/[0-9+\-*/.=]/)) {
              agregarInput(key);
            }
            break;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [input]);
  return (
    <div className={isDarkTheme ? "dark-theme" : "light-theme"}>
      <div className="logos-container">
        <img src={awblogo} className="logo-awb" alt="Logo de AWB" />
        <span className="plus">+</span>
        <img src={reactlogo} className="logo-react" alt="Logo de React" />
        <span className="plus">+</span>
        <img src={alelogo} className="logo-ale" alt="Logo de Ale" />
      </div>
      <div className="switch-container">
        <label className="switch">
          <input type="checkbox" onChange={toggleTheme} checked={isDarkTheme} />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="contenedor-calculadora">
        <Pantalla input={input} />
        <div className="fila">
          <Boton manejarClic={agregarInput}>1</Boton>
          <Boton manejarClic={agregarInput}>2</Boton>
          <Boton manejarClic={agregarInput}>3</Boton>
          <Boton manejarClic={agregarInput}>+</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={agregarInput}>4</Boton>
          <Boton manejarClic={agregarInput}>5</Boton>
          <Boton manejarClic={agregarInput}>6</Boton>
          <Boton manejarClic={agregarInput}>-</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={agregarInput}>7</Boton>
          <Boton manejarClic={agregarInput}>8</Boton>
          <Boton manejarClic={agregarInput}>9</Boton>
          <Boton manejarClic={agregarInput}>*</Boton>
        </div>
        <div className="fila">
          <Boton manejarClic={calcularResultado}>=</Boton>
          <Boton manejarClic={agregarInput}>0</Boton>
          <Boton manejarClic={agregarInput}>.</Boton>
          <Boton manejarClic={agregarInput}>/</Boton>
        </div>
        <div className="fila">
          <BotonClear manejarClear={() => setInput("")}>Clear</BotonClear>
        </div>
      </div>
    </div>
  );
}
export default App;