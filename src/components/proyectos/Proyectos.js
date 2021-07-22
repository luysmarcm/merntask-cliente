import React, {useContext, useEffect} from 'react'
import Sidebar from '../layout/Sidebar'
import NavBar from '../layout/NavBar'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'
import authContext from '../../context/autenticacion/authContext'

const Proyectos = () => {

    const authsContext = useContext(authContext);
    const {usuarioAutenticado}= authsContext

    useEffect(()=>{
        usuarioAutenticado()
        // eslint-disable-next-line
    }, [])


    return (
        <div className="contenedor-app">
            <Sidebar/>
            <div className="seccion-principal">
                <NavBar/>
                <main>
                <FormTarea/> 
                    <div className="contenedor-tareas">
                        <ListadoTareas/>
                    </div>
                </main>

            </div>
             

        </div>
            
    )
}

export default Proyectos
