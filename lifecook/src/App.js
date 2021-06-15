import './App.css';
import React from "react";
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

function App() {
  
  return (
    
    <div> 
      <div>
        <Header/>
      </div>
      
      <div class="lo">
        <span class="iconify" data-icon="emojione:cookie" data-inline="false" data-width="225" data-height="220"></span>
        <img class="Logo"src={logo}/>
      </div>
        <div class="footer"> 
          <Footer/>
        </div>
    </div>
    
    
  );
}



export default App;
