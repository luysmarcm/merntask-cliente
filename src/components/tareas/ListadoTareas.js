import React, {useContext} from 'react';
import Tarea from './Tarea'
import proyectoContext from "../../context/proyecto/proyectoContext";
import TareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadoTareas = () => {

    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext

    const tareasContext = useContext(TareaContext);
    const {tareasproyecto} = tareasContext;

    if(!proyecto) return <h2>Seleccione un proyecto</h2>

    const [proyectoActual] = proyecto
    


    return (
        <>
        <h2>Proyecto: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ?(<li className="tarea"><p>No hay tareas</p></li>)
                    :<TransitionGroup>
                       {tareasproyecto.map(tarea =>(
                         <CSSTransition
                         key={tarea._id}
                         timeout={300}
                         classNames="tarea"
                        >
                             <Tarea
                            
                            tarea={tarea}
                         />
                         </CSSTransition>
                    ))} 
                    </TransitionGroup>

                }
               
            
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={()=> eliminarProyecto(proyectoActual._id)}
            >Eliminar Proyecto&times;</button>
            
        </>
    )
}

export default ListadoTareas
