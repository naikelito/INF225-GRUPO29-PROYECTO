import './App.css';
import { useState,setData, useEffect } from 'react';
import { getTest } from './funtions/test';
import { BrowserRouter as Router, Route, Switch, Link, Routes} from 'react-router-dom';
import { Cookies, CookiesProvider, useCookies } from 'react-cookie'

import SignUp from './Components/SignUp';
import Inicio from './Components/Inicio';
import Login from './Components/Log';
import Examenes from './Components/Examenes';
import ReserveConsultation from './Components/ReservaConsulta';
import SignUpPers from './Components/SignUpPers';


function App() {
  
return(
  <div className='App'>
    <Router>
        <CookiesProvider>
          <Routes>
            <Route path = "/" element={<Inicio/>}/>
            <Route path = "/SignUp" element={<SignUp/>}/>
            <Route path = "/Login" element={<Login/>}/>
            <Route path="/reservar/:examType" element={<ReserveConsultation />} />
            <Route path="/examenes" element={<Examenes/>} />
            <Route path="/SignUpPer" element={<SignUpPers/>} />
            
          </Routes>
        </CookiesProvider>
        </Router>

  </div>
);
}

export default App;
