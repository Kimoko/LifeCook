import React from 'react'

export const Recipe = ({ label, calories, image, ingredients }) => {
    return (
        <div>
            <p>{label}</p>
            <p>{Math.round(calories)}</p>
            <img src={image} alt=""/>
            <ol>
                {ingredients.map((ingredient) => 
                    (
                        <li>{ingredient.text}</li>
                    ) 
                )}
            </ol>

        </div>
    );
};


export default Recipe
