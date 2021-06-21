import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/user";
import {firestore} from '../../lib/firebase'
import Header from "../Header2";
import * as ROUTES from '../../constants/routes';

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
      return <li key={i}>{ingredient}</li>;
    });
  };

  const renderRecipe = () => {
    const recipeData = recipe.data();
    console.log(recipeData.description);
    return (
      <>
      <Header/>
        <h2>{recipeData.name}</h2>
        <ul>{renderIngredients()}</ul>
        <pre>
          <p>{recipeData.description}</p>
        </pre>
      </>
    );
  };

  return (
    <div className="recipe">
      {recipe && renderRecipe()}
      <button onClick={() => history.push(`/edit/${props.match.params.id}`)}>
        Edit
      </button>
      <button onClick={deleteRecipe}>Delete</button>
    </div>
  );
};

export default Recipe;