import './App.css';
import React, {lazy, Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Recipe from "./Pages/Recipe";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Header from './Components/Header';
import Footer from './Components/footer';
import logo from './Components/Слой25.png';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as ROUTES from './constants/routes';

const Login = lazy(() => import('./Pages/login'));

function App() {
  
  return (
    
    <div> 
      <div>
        <Header/>
      </div>
      
      <div class="lo">
        <span className="iconify" data-icon="emojione:cookie" data-inline="false" data-width="225" data-height="220"></span>
        <img className="Logo"src={logo}/>
      </div>
        <div className="footer"> 
          <Footer/>
        </div>
        <Router>
          <Suspense fallback={<p>Loading ...</p>}>
      <Switch>
        <Route exact path={ ROUTES.LOGIN } component={Login}/>
        
      </Switch>
      </Suspense>
    </Router>
    </div>
    
    
  );
}



export default App;
