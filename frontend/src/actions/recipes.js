import { _getRecipes, _getRecipesDetail, _saveRecipe, _deleteRecipe } from "../utils/api";
export const RECEIVE_RECIPES = "RECEIVE_RECIPES";
export const ADD_RECIPE = "ADD_RECIPE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const DELETE_RECIPE = "DELETE_RECIPE";

function receiveRecipes(recipes) {
    return {
        type: RECEIVE_RECIPES,
        recipes,
    };
}

function addRecipe(recipe) {
    return {
        type: ADD_RECIPE,
        recipe,
    };
}

function updateRecipe(recipe) {
    return {
        type: UPDATE_RECIPE,
        recipe,
    };
}

function deleteRecipe(id) {
    return {
        type: DELETE_RECIPE,
        id,
    }
}

export function getPublicData() {
    return dispatch => {
        return _getRecipes().then(recipes => {
            dispatch(receiveRecipes(recipes));
        });
    };
}

export function getRecipeDetails() {
    return dispatch => {
        return _getRecipesDetail().then(recipes => {
            dispatch(receiveRecipes(recipes));
        });
    };
}

export function saveRecipe(id, recipeTitle, ingredients, instructions) {
    return (dispatch, getState) => {
        const authedUser = getState().authedUser;
        return _saveRecipe({ id, recipeTitle, ingredients, instructions }, authedUser).then(recipe => {
            if (id === -1)
                dispatch(addRecipe(recipe));
            else
                dispatch(updateRecipe(recipe));
        });
    };
}

export function handleDeleteRecipe(id) {
    return (dispatch) => {
        return _deleteRecipe(id).then(deletedId => {
            dispatch(deleteRecipe(deletedId));
        });
    };
}