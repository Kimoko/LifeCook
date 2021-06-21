import React, { useContext } from "react";
import {useState} from 'react'; 
import UserContext from "../../context/user";
import {config, firestore, storage, firebase} from '../../lib/firebase'

export default function NewRecipe() {

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
            <h2>New recipe</h2>
            <form>
                <input
                    type='text'
                    placeholder='name'
                    value={name}
                    onChange={(e) => setName( e.target.value)}
                 /><p></p>
                 <input
                    type='text'
                    placeholder='ingredients'
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                /><p></p>
                <input
                    type="file"
                   /*  value={fileUrl} */
                    onChange={onFileChange}
                /><p></p>
                <textarea
                    type='text'
                    placeholder='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                /><p></p>
                <button onClick={saveRecipe}>Save recipe</button>

            </form>
        </div>
    );
};



