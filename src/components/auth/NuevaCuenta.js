import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import alertaContext from "../../context/alerta/alertaContext";
import authContext from "../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {
  const alertasContext = useContext(alertaContext);
  const { alerta, mostrarAlerta } = alertasContext;

  const authsContext = useContext(authContext);
  const {mensaje, autenticado, regristarUsuario}=authsContext


  useEffect(() => {
    
    if(autenticado){
      props.history.push('/proyectos')
    }

    if(mensaje){
      mostrarAlerta(mensaje.msg,mensaje.categoria);
    }
    // eslint-disable-next-line
  }, [mensaje,autenticado, props.history,mostrarAlerta])

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });

  const { nombre, email, password, confirmar } = usuario;

  const onChange = e => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    

    if (nombre.trim() === "" || email.trim() === "" || password.trim() === "" || confirmar.trim() === "" ) 
    {
      mostrarAlerta('Los campos son obligatorios', 'alerta-error');
      console.log(mostrarAlerta);
      return;
    }

    if (password.length < 6) {
      mostrarAlerta('El password debe ser de al menos 6 caracteres',
        'alerta-error' );
      return;
    }

    if (password !== confirmar) {
      mostrarAlerta('Los passwords no son iguales', 'alerta-error');
      return;
    }

    regristarUsuario({
      nombre, email, password
    })  
  };



  

  

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crear Nueva Cuenta</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="ema il">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
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
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="confirmar">Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Confirmar Password"
              value={confirmar}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Registrarme"
              
            />
          </div>
        </form>
        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
