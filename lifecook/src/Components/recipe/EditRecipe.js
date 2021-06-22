import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/user";
import {firestore, firebase} from '../../lib/firebase'
import Header from "../Header2";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Footer from "../footer";
import '../recipes.css';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '350px',
        /* color: 'black', */
        
      },
    },
    rootq: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
  }));

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
  const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
      <>
      <Header/>
    <div className="edit-recipe">
    <div className={classes.root}>
      <h1>Edit recipe</h1>
      <form>
        <TextField
          id="standard-textarea"
          type="text"
          label='Name'
          multiline
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><p></p>
        <TextField
          id="standard-textarea"
          type="text"
          label="Ingredients"
          multiline
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        /><p></p>
         <input
           type="file"
           onChange={onFileChange}
        /><p></p>
        <TextField
          id="outlined-multiline-static"
          type='text'
          label="Description"
          rows={4}
          variant="outlined"
          multiline
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><p></p>
        <Button  variant="contained" color="primary" onClick={saveRecipe}>Save recipe</Button>
      </form>
      </div>
    </div>
    <div className="ffooterrr"> 
          <Footer/>
        </div>
    </>
  );
};

export default EditRecipe;