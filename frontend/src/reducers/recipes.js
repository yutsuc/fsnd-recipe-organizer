import { RECEIVE_RECIPES, ADD_RECIPE } from "../actions/recipes";

export default function recipes(state = {}, action) {
    switch (action.type) {
        case RECEIVE_RECIPES:
            return {
                ...state,
                ...action.recipes,
            };

        case ADD_RECIPE:
            return {
                ...state,
                [action.recipe.id]: {
                    id: action.recipe.id,
                    title: action.recipe.recipeTitle,
                    ingridients: action.recipe.ingridients,
                    instructions: action.recipe.instructions,
                },
            };

        default:
            return state;
    }
}