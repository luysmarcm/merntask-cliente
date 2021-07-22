import React, {useContext, useEffect} from 'react';
import Proyecto from './Proyecto';
import proyectoContext from "../../context/proyecto/proyectoContext";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import alertaContext from '../../context/alerta/alertaContext';

const ListadoProyectos = () => {

    const proyectosContext = useContext(proyectoContext)
    const {mensaje, proyectos, obtenerProyectos} = proyectosContext

    const alertasContext = useContext(alertaContext);
    const { alerta, mostrarAlerta } = alertasContext;

    

    useEffect(() =>{

      if(mensaje){
        mostrarAlerta(mensaje.msg, mensaje.categoria);
      }
      obtenerProyectos();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje]);

    if(proyectos.length === 0) return <p className="mensaje">No hay proyectos</p>;



    return (
      <ul className="listado-proyectos">

      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div>
      ) : null}
        <TransitionGroup>
        {proyectos.map(proyecto => (
         <CSSTransition
            key={proyecto._id}
            timeout={300}
            classNames="proyecto"
         >
              <Proyecto
                
                proyecto={proyecto}
              />
              </CSSTransition>
          ))}

        </TransitionGroup>
         


      </ul>
    )
}

export default ListadoProyectos
