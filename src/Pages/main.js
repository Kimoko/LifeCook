 import React, {lazy, Suspense } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header';
import Footer from '../Components/footer';
import logo from '../Components/Слой25.png';
import '../App.css';

export default function Main() {
  
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
    </div>
    
    
  );
}