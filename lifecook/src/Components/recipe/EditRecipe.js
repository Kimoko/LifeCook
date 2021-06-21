import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/user";
import {firestore, firebase} from '../../lib/firebase'
import Header from "../Header2";

const EditRecipe = (props) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [description, setDescription] = useState("");
  const [fileUrl, setFileUrl] = useState(null);

  const user = useContext(UserContext);

  const history = useHistory();

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  useEffect(() => {
    const getRecipe = async () => {
      const recipeDoc = await firestore
        .collection("Recipes")
        .doc(props.match.params.id)
        .get();
      const recipeData = recipeDoc.data();
      setName(recipeData.name);
      setIngredients(recipeData.ingredients.toString());
      setDescription(recipeData.description);
      setFileUrl(recipeData.fileUrl)
    };
    getRecipe();
  }, [user, props.match.params.id]);

  const saveRecipe = async (e) => {
    e.preventDefault();

    const ingredientsArray = ingredients.split(",");

    await firestore
      .collection("Recipes")
      .doc(props.match.params.id)
      .set({
        name,
        ingredients: ingredientsArray,
        description,
        fileUrl,
      });

    history.push(`/r/${props.match.params.id}`);
  };

  return (
      <>
      <Header/>
    <div className="edit-recipe">
      <h1>Edit recipe</h1>
      <form>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><p></p>
        <input
          type="text"
          placeholder="Ingredients separated by comma"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        /><p></p>
         <input
                    type="file"
                    onChange={onFileChange}
                /><p></p>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><p></p>
        <button onClick={saveRecipe}>Save recipe</button>
      </form>
    </div>
    </>
  );
};

export default EditRecipe;