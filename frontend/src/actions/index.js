export const RECEIVE_RECIPES = "RECEIVE_RECIPES";
export const ADD_RECIPE = "ADD_RECIPE";
export const ADD_INGRIDIENT = "ADD_INGRIDIENT";

export function receiveRecipes(recipes) {
    return {
        type: RECEIVE_RECIPES,
        recipes,
    };
}

export function addRecipe(recipe) {
    return {
        type: ADD_RECIPE,
        recipe
    };
}

export function addIngridient(recipeTitle, ingridient) {
    return {
        type: ADD_INGRIDIENT,
        recipeTitle,
        ingridient,
    };
}