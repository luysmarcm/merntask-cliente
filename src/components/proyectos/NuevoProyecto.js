import React, { useState, useContext } from "react";
import proyectoContext from "../../context/proyecto/proyectoContext";

const NuevoProyecto = () => {


 const proyectosContext = useContext(proyectoContext);
 const {formulario,errorformulario, mostrarFormulario, agregarProyectos, mostrarError} = proyectosContext
  

  const [proyecto, setproyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  const onChangeProyecto = (e) => {
    setproyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  const onSudmitProyecto = (e) => {
    e.preventDefault();

    if (nombre === ''){
      mostrarError()
      return;
    }

    agregarProyectos(proyecto);

    setproyecto({
      nombre:''
    })



  };

  const onClickProyecto = () =>{
    mostrarFormulario()
  }

  return (
    <>
      <button type="button" 
              className="btn btn-primario btn-block" 
              onClick={onClickProyecto}>
        Nuevo Proyecto
      </button>
  
        {formulario
        ?(
          <form className="formulario-nuevo-proyecto" onSubmit={onSudmitProyecto} >
          <input
            type="text"
            name="nombre"
            value={nombre}
            className="input-text"
            placeholder="Nuevo proyecto"
            onChange={onChangeProyecto}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
            onChange={onChangeProyecto}
          />
        </form>
        )
        : null

        }
       {errorformulario ? <p className= "mensaje error">El campo es obligatorio</p> : null}
    </>
  );
};

export default NuevoProyecto;
