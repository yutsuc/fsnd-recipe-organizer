import React from "react";
import { useParams } from "react-router-dom";
import RecipeFrom from "./RecipeForm";

const Recipe = (props) => {
    const { id } = useParams();
    return (
        <div>
            recipe {id}
            <RecipeFrom id={id} />
        </div>
    )
}

export default Recipe;