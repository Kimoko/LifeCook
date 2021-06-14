import './App.css';
import React,{useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Recipe from "./Pages/Recipe";
function App() {
  const APP_ID ="2e6758f4";
  const APP_KEY ="8840b845e508bf6e5a37c2d7c1963804"; 
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");
  useEffect(() => {
    getRecipe();
  }, [query]);
  const getRecipe = async () => {
    const response = await axios.get(
      'https://api.edamam.com/search?q='+query+'&app_id='+APP_ID+'&app_key='+APP_KEY+''
      );
    setRecipes(response.data.hits);
    console.log(response.data.hits);
};
const updateSearch = (e) =>{
  setSearch(e.target.value);
};
const updateQuery = (e) => {
  e.preventDefault();
  setQuery(search);
}
  return (
    <div className="app">
      <form onSubmit={updateQuery}>
        <input type='text' value={search} onChange={updateSearch} />
        <button type="submt">Search</button>
      </form>
      {recipes.map((recipe)=>(
        <Recipe 
          label={recipe.recipe.label}
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
      ))}
   </div>
   
  );
}

export default App;
