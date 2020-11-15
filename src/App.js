import React, { useEffect, useState } from 'react';
import './CSS/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Sidebar from './components/Sidebar';
import Mapping from './components/Mapping';
import AddData from './components/AddData'
import { BrowserRouter as Router, Switch, Route, BrowserRouter} from 'react-router-dom';



function App() {

  return (
  <BrowserRouter>
  <div className='App'>
    <Sidebar/>
    <div className='content'>
      <Switch>
        <Route path='/' exact component={Mapping} />
        <Route path='/AddData' exact component={AddData} />
      </Switch>  
    </div>
  </div> 
  </BrowserRouter>
   
  
  
   
 
  );
}

export default App;
