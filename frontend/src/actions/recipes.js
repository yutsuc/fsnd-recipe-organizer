import { _getRecipes, _getRecipesDetail, _saveRecipe } from "../utils/api";
export const RECEIVE_RECIPES = "RECEIVE_RECIPES";
export const ADD_RECIPE = "ADD_RECIPE";
export const UPDATE_RECIPE = "UPDATE_RECIPE";

function receiveRecipes(recipes) {
    return {
        type: RECEIVE_RECIPES,
        recipes,
    };
}

export function getPublicData() {
    return dispatch => {
        return _getRecipes().then(recipes => {
            dispatch(receiveRecipes(recipes));
        });
    }
}

export function getRecipeDetails() {
    return dispatch => {
        return _getRecipesDetail().then(recipes => {
            dispatch(receiveRecipes(recipes));
        });
    }
}

function addRecipe(recipe) {
    return {
        type: ADD_RECIPE,
        recipe
    };
}

function updateRecipe(recipe) {
    return {
        type: UPDATE_RECIPE,
        recipe,
    };
}

export function saveRecipe(id, recipeTitle, ingridients, instructions) {
    return (dispatch, getState) => {
        const authedUser = getState().authedUser;
        return _saveRecipe({ id, recipeTitle, ingridients, instructions }, authedUser).then(recipe => {
            if (id === -1)
                dispatch(addRecipe(recipe));
            else
                dispatch(updateRecipe(recipe));
        });
    };
}