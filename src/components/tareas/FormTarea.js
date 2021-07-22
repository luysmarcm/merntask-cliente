import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from "../../context/proyecto/proyectoContext";
import TareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {

    const proyectosContext = useContext(proyectoContext);
    const {proyecto} = proyectosContext

    const tareasContext = useContext(TareaContext);
    const {tareaseleccionada, errortarea,agregarTarea, mostrarErrorT, obtenerTareas,actualizarTarea,limpiarTarea} = tareasContext;

    useEffect(() => {
      if(tareaseleccionada !== null){
        settarea(tareaseleccionada)
      }else{
        settarea({
          nombre:''
        })
      }
    }, [tareaseleccionada])

    const [tarea, settarea] = useState({
      nombre: ''
    })

    const {nombre} = tarea;

    if(!proyecto) return null 

    const [proyectoActual] = proyecto 

    const handleChange = e =>{
      settarea({
        ...tarea,
        [e.target.name] : e.target.value
      })

       
    }

  const onSubmit = e =>{
    e.preventDefault();

    if(nombre.trim()=== ''){
      mostrarErrorT();
      return
    }

    if(tareaseleccionada === null){
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea)
    }else{
      actualizarTarea(tarea)

      limpiarTarea()
    }
    
    

    obtenerTareas(proyectoActual.id)

    settarea({
      nombre:''
    })

  }

  return (
    <div className="formulario">
      <form
        onSubmit={onSubmit}
      >
        <div className="contenedor-input">
            <input
                type="text"
                className="input-text"
                placeholder="Nombre tarea.."
                name="nombre"
                value={nombre}
                onChange={handleChange}
            />

            

        </div>
        <input
                type="submit"
                className="btn btn-primario btn-submit btn-block"
                value={tareaseleccionada ? 'Editar Tarea' : 'Agregar tarea'}
            
            />
      </form>
      {errortarea ? <p className= "mensaje error">El campo es obligatorio</p> : null}
    </div>
  );
};

export default FormTarea;
