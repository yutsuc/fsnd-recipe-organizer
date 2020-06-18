import { RECEIVE_RECIPES, ADD_RECIPE, ADD_INGRIDIENT } from "../actions";

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
                [action.recipe.recipeTitle]: {
                    title: action.recipe.recipeTitle,
                    ingridients: action.recipe.ingridients,
                    instructions: action.recipe.instructions,
                },
            };
        case ADD_INGRIDIENT:
            return {
                ...state,
                [action.recipeTitle]: {
                    ...state[action.recipeTitle],
                    ingridients: state[action.recipeTitle].ingridients.concat(action.ingridient),
                },
            };
        default:
            return state;
    }
}