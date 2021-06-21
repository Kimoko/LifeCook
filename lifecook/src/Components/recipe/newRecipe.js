import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {useState} from 'react'; 
import UserContext from "../../context/user";
import {config, firestore, storage, firebase} from '../../lib/firebase'
import Button from '@material-ui/core/Button';
import "../profile.css"

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



export default function NewRecipe() {
    const classes = useStyles();
    const [value, setValue] = React.useState('Controlled');

    const handleChange = (event) => {
    setValue(event.target.value);
  };

    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");
    const [fileUrl, setFileUrl] = useState(null);
    
    const user = useContext(UserContext);

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);
        setFileUrl(await fileRef.getDownloadURL());
      };

    const saveRecipe = async (e) => {
        
        e.preventDefault();
        const ingredientsArray = ingredients.split(",");
        
        await firestore
      .collection("Recipes")
      .add({
        name,
        ingredients: ingredientsArray,
        description,
        fileUrl,
      });
      setName("");
      setIngredients("");
      setDescription("");
      /* setFileUrl(null); */
    }

    return(
        <div className='new-recipe'>
            <div className={classes.root}>
            <h2>New recipe</h2>
            <form>
                <TextField
                    id="standard-textarea"
                    type='text'
                    label='Name'
                    multiline
                    value={name}
                    onChange={(e) => setName( e.target.value)}
                 /><p></p>
                 <TextField
                    id="standard-textarea"
                    type='text'
                    label='Ingredients'
                    value={ingredients}
                    multiline
                    onChange={(e) => setIngredients(e.target.value)}
                /><p></p>
                <input
                    type="file"
                    onChange={onFileChange}
                /><p></p>
                <TextField
                    id="outlined-multiline-static"
                    type='text'
                    label='Description'
                    rows={4}
                    variant="outlined"
                    className='new-recipe1'
                    multiline
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                /><p></p>
                <Button  variant="contained" color="primary" onClick={saveRecipe}>Save recipe</Button>

            </form>
            </div>
        </div>
    );
};



