import './App.css';
import { useState,setData, useEffect } from 'react';
import { getTest } from './funtions/test';
import { BrowserRouter as Router, Route, Switch, Link, Routes} from 'react-router-dom';
import { Cookies, CookiesProvider, useCookies } from 'react-cookie'

import Log from './Components/Log';
import SignUp from './Components/SignUp';

/*
  const [data,setData] = useState("hello world!");

  useEffect(() =>{
    getTest().then((res) =>{
      setData(res.message)
    })
    .catch((err) =>console.log(err))
  },[]);

  return (
    <div className='App'>
      <h1>{data}</h1>
    </div>
  );
*/


function App() {
  
return(
  <div className='App'>
    <Router>
        <CookiesProvider>
          <Routes>
            <Route path = "/" element={<Log/>}/>
            <Route path = "/SignUp" element={<SignUp/>}/>
            
          </Routes>
        </CookiesProvider>
        </Router>

  </div>
);
}

export default App;
