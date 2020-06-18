import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import RecipeForm from "./RecipeForm";

const Recipe = (props) => {
    const { id } = useParams();
    const recipe = useSelector(state => state.recipes[id])
    return (
        <RecipeForm recipe={recipe} />
    )
}

export default Recipe;