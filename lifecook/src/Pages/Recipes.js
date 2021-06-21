import '../Components/recipes.css';
import React,{useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Recipe from "./Recipe";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import Header from '../Components/Header2';
import Footer from '../Components/footer';
import Sidebar from '../Components/sidebar/index';
import Timeline from '../Components/timeline';

const SearchStyle = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: 'auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));


export default function Recipes() {
  useEffect(() => {
    document.title = 'Resipes'
  })
  const classes = SearchStyle();
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
    <>
    <div>
     <Header/>
     </div>
     <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
    <Sidebar/>
    {/* <Timeline/> */}
    </div>





    <div className="app">
      <Paper justify="center" component="form" onSubmit={updateQuery} className={classes.root}>
          <IconButton className={classes.iconButton} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <InputBase
            type='text' 
            value={search} 
            onChange={updateSearch}
            className={classes.input}
            placeholder="Search recipes"
            inputProps={{ 'aria-label': 'search recipes' }}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      <Grid container>
      
      {recipes.map((recipe)=>(
        <Grid item xs={3}>
        <Recipe 
          key={recipe.recipe.label}
          label={recipe.recipe.label}
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
          />
        </Grid>  
      ))}
     </Grid>
   </div>
   <div className="footerr"> 
          <Footer/>
        </div>
   </>
  );
}