import './App.css';
import { useState,setData, useEffect } from 'react';

import { getTest } from './funtions/test';

import Log from './Components/Log';

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
    
    <Log/>
  </div>
);
}

export default App;
