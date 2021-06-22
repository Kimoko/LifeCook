import '../Components/recipes.css';
import React,{useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Components/Header2';
import Footer from '../Components/footer';
import Sidebar from '../Components/sidebar/index';
import RecipeList from '../Components/recipe/recipeList';

export default function Recipes() {
  
  return (
    <>
    <div>
     <Header/>
     </div>
     <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
    <Sidebar/>
    </div>
        <div >
          <RecipeList/>
          </div>
          <div className="app"> 
   </div>
   <div className="footerr"> 
          <Footer/>
        </div>
   </>
  );
}