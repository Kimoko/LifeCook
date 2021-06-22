import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/user";
import {firestore} from '../../lib/firebase'
import Header from "../Header2";
import * as ROUTES from '../../constants/routes';
import "../recipes.css";
import Footer from "../footer";
import Button from '@material-ui/core/Button';
import { ExportCSV } from "../../services/ExportCSV";


const Recipe = (props) => {
  const [recipe, setRecipe] = useState(undefined);

  const user = useContext(UserContext);

  const history = useHistory();

  const deleteRecipe = async () => {
    await firestore
      .collection("Recipes")
      .doc(props.match.params.id)
      .delete();
    history.push("/recipes");
  };

  useEffect(() => {
    const getRecipe = async () => {
      const recipeDoc = await firestore
        .collection("Recipes")
        .doc(props.match.params.id)
        .get();

      setRecipe(recipeDoc);
    };
    getRecipe();
  }, [user, props.match.params.id]);

  const renderIngredients = () => {
    const recipeData = recipe.data();
    return recipeData.ingredients.map((ingredient, i) => {
      return <li key={i}>{ingredient}</li>
    });
  };
  
  const renderRecipe = () => {
    const recipeData = recipe.data();
    const ingr = renderIngredients()
    const fileName = recipeData.name;
    const viewers = [
    {id:1,name: recipeData.name},
    {id:2, ingr: ingr},
    {id:3,discr: recipeData.description}

  ]
    
    /* console.log(recipeData.description); */
    return (
      <>
      <Header/>
        <h2 className="na">{recipeData.name}</h2>
        <div className="allrecipe">
            <div className="img"><img  width="100%"  /* height="300" */ src={recipeData.fileUrl}/></div>
            <div className="ingr"> Ингредиенты{renderIngredients()}</div>
            <div className="discr">
              Инструкция:
            <pre className="di">
              
                    {recipeData.description}
            </pre>
            </div>
        </div>
        <div className="export">
        <ExportCSV csvData={viewers} fileName={fileName} />
        </div>
      </>
    );
  };

  return (
    <div className="recipe">
      {recipe && renderRecipe()}
      
      <div className="recipeby">
      <Button  variant="contained" color="primary" onClick={() => history.push(`/er/${props.match.params.id}`)}>
        Edit
      </Button>
      <Button  variant="contained" color="primary" onClick={deleteRecipe}>Delete</Button>
      </div>
      <div className="footerrr"> 
          <Footer/>
        </div>
    </div>
  );
};

export default Recipe;