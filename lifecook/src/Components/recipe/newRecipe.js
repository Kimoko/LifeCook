import React, { useContext } from "react";
import {useState} from 'react'; 
import UserContext from "../../context/user";
import {firestore} from '../../lib/firebase'

export default function NewRecipe() {

    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("")
    
    const user = useContext(UserContext);

    const saveRecipe = async (e) => {
        
        e.preventDefault();
        const ingredientsArray = ingredients.split(",");

        await firestore
      .collection("Recipes")
      .add({
        name,
        ingredients: ingredientsArray,
        description,
      });
      setName("");
      setIngredients("");
      setDescription("");
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



