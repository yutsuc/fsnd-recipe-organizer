import React from "react";
import { useParams } from "react-router-dom";
import RecipeForm from "./RecipeForm";

const Recipe = () => {
    const { id } = useParams();

    return (
        <RecipeForm id={Number(id)} />
    )
}

export default Recipe;