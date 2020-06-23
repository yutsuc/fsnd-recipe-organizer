import { RECEIVE_RECIPES, ADD_RECIPE, UPDATE_RECIPE, DELETE_RECIPE } from "../actions/recipes";

export default function recipes(state = [], action) {
    switch (action.type) {
        case RECEIVE_RECIPES:
            return [
                // ...state,
                ...action.recipes,
            ];

        case ADD_RECIPE:
            return [
                ...state,
                action.recipe,
            ].sort((a, b) => a.title.localeCompare(b.title));

        case UPDATE_RECIPE:
            return [
                ...state.filter(r => r.id !== action.recipe.id),
                action.recipe,
            ].sort((a, b) => a.title.localeCompare(b.title));
        
        case DELETE_RECIPE: 
            return [
                ...state.filter(r => r.id !== action.id),
            ];
            
        default:
            return state;
    }
}