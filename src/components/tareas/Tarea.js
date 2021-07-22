import React, {useContext} from 'react';
import proyectoContext from "../../context/proyecto/proyectoContext";
import TareaContext from '../../context/tareas/tareaContext';

const Tarea = ({ tarea }) => {

  const proyectosContext = useContext(proyectoContext);
  const {proyecto} = proyectosContext

  const tareasContext = useContext(TareaContext);
  const {eliminarTarea,obtenerTareas, actualizarTarea, guardarTareaActual} = tareasContext;

  const [proyectoActual] = proyecto 

  const tareaEliminar = id =>{
    eliminarTarea(id, proyectoActual._id)
    obtenerTareas(proyectoActual.id)
  }
 
  const seleccionarTarea = tarea =>{
    guardarTareaActual(tarea)
  }


  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo" onClick={()=> actualizarTarea(tarea)}>
            Completado
          </button>
        ) : (
          <button type="button" className="incompleto" onClick={()=>actualizarTarea(tarea)}>
            Incompleto
          </button>
        )}
      </div>
      <div className="acciones">
        <button type="button" className="btn btn-primario" onClick={()=> seleccionarTarea(tarea)}>
          Editar
        </button>

        <button type="button" 
                className="btn btn-secundario" 
                onClick={()=>tareaEliminar(tarea._id)}
                >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
