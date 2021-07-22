import React, {useReducer } from 'react';
import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {FORMULARIO_PROYECTO, 
        OBTENER_PROYECTO, 
        AGREGAR_PROYECTO, 
        VALIDAR_FORMULARIO,
        PROYECTO_ACTUAL,
        ELIMINAR_PROYECTO,
        ERROR_PROYECTO} from '../../types';
import clienteAxios from '../../config/axios';


const ProyectoState = props => {


    const initialState ={
        proyectos : [],
        formulario : false,
        errorformulario: false,
        proyecto: null
    }

    const [state, dispatch] = useReducer(proyectoReducer, initialState)


    const mostrarFormulario = () =>{
        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    const obtenerProyectos = async() => {
        try {
            const resultado = await clienteAxios.get('/api/proyectos')

            dispatch({
                type: OBTENER_PROYECTO,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: 'Error',
                categoria: 'alerta-error'
            }

             
             dispatch({
                 type:ERROR_PROYECTO,
                 payload: alerta
             })
            
        }
    }

    const agregarProyectos = async proyecto =>{
         try {
             const resultado = await clienteAxios.post('/api/proyectos', proyecto)
             dispatch({
                type:AGREGAR_PROYECTO,
                payload:resultado.data
            })


         } catch (error) {
            console.log(error)
            const alerta = {
                msg: 'Error',
                categoria: 'alerta-error'
            }

             
             dispatch({
                 type:ERROR_PROYECTO,
                 payload: alerta
             })
             
         }
 
        
       
    }

    const mostrarError = () =>{
        dispatch({
            type:VALIDAR_FORMULARIO,
        })
    }

    const proyectoActual = proyectoId => {
        dispatch({
            type:PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    const eliminarProyecto = async  proyectoId =>{
        try {

           await clienteAxios.delete(`/api/proyectos/${proyectoId}`)

            dispatch({
                type:ELIMINAR_PROYECTO,
                payload: proyectoId
            })
            
        } catch (error) {
            console.log(error)
            const alerta = {
                msg: 'Error al eliminar',
                categoria: 'alerta-error'
            }

             
             dispatch({
                 type:ERROR_PROYECTO,
                 payload: alerta
             })
             
        }
    }



   return(
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorformulario: state.errorformulario,
                proyecto: state.proyecto, 
                mostrarFormulario,
                obtenerProyectos,
                agregarProyectos,
                mostrarError,
                proyectoActual,
                eliminarProyecto

            }}
        >

            {props.children}

        </proyectoContext.Provider>


   )

}
 
export default ProyectoState;


