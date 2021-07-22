import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyectos/Proyectos";
import ProyectoState from "./context/proyecto/ProyectoState";
import TareaState from "./context/tareas/TareaState";
import AlertaState from "./context/alerta/alertaState";
import AuntState from "./context/autenticacion/authState";
import tokenAuth from "./config/token";
import RutaPrivada from "./components/rutas/RutaPrivada";

const token= localStorage.getItem('token')
if(token){
  tokenAuth(token)
}
function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuntState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuntState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
