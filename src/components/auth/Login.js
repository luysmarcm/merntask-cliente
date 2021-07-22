import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import authContext from "../../context/autenticacion/authContext";
import alertaContext from "../../context/alerta/alertaContext";


const Login = (props) => {

  const alertasContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertasContext;

  const authsContext = useContext(authContext);
  const {mensaje, autenticado, iniciarSesion}= authsContext

  useEffect(() => {
    
     if(autenticado){
       props.history.push('/proyectos')
     }    

    if(mensaje){
      mostrarAlerta(mensaje.msg,mensaje.categoria);
    }
    // eslint-disable-next-line
    
  }, [mensaje,autenticado, props.history, mostrarAlerta])


  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const { email, password } = usuario;

  const onChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if(email.trim() === '' || password.trim() === "" ){
      mostrarAlerta('Los campos son obligatorios', 'alerta-error');
    }

    iniciarSesion({email, password})
  };

  return (
    <div className="form-usuario">
      {alerta ? (<div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sección</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sección"
            />
          </div>
        </form>
        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
