import React, { useReducer } from 'react';
import TareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';
import {TAREAS_PROYECTO,
        AGREGAR_TAREA, 
        VALIDAR_TAREA,
        ELIMINAR_TAREA,
        TAREA_ACTUAL,
        ACTUALIZAR_TAREA,
        LIMPIAR_TAREA,
        ERROR_PROYECTO} from '../../types';


const TareaState = props => {

    const initialState ={
        tareasproyecto: [],
        errortarea: false,
        tareaseleccionada: null
    }

    const [state, dispatch] = useReducer(tareaReducer, initialState)

    const obtenerTareas = async proyecto => {
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto }} )

            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
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

    const agregarTarea = async tarea =>{
        
        try {

            const resultado = await clienteAxios.post('/api/tareas', tarea)
            console.log(resultado)
            dispatch({
                type:AGREGAR_TAREA,
                payload:tarea
            })
            
        } catch (error) {
            
        }
        
    }

    const actualizarTarea = async tarea =>{
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}` , tarea)
            
            dispatch({
                type:ACTUALIZAR_TAREA,
                payload:resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
            
        }
    }

    const mostrarErrorT = () =>{
        dispatch({
            type:VALIDAR_TAREA,
        })
    }
    const eliminarTarea = async (id, proyecto) => {
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error)
        }
    }

     const guardarTareaActual = tarea =>{
         dispatch({
             type:TAREA_ACTUAL,
             payload:tarea
         })
     }

     

     const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }




    return (
      <TareaContext.Provider
            value={{

                tareas: state.tareas,
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                agregarTarea,
                mostrarErrorT,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea

            }}
      >

        {props.children}
      </TareaContext.Provider>
    )
}

export default TareaState
