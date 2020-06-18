const API_URL = "";

export function _getRecipes() {
    fetch(`${API_URL}/recipes`, {
        method: "GET"
    })
}

function _addRecipe(recipe) {
    fetch(`${API_URL}/recipes`, {
        method: "POST",
    })
}

function _updateRecipe(recipe) {
    fetch(`${API_URL}/recipes`, {
        method: "PATCH",
    })
}

export function _saveRecipe(recipe, owner) {
    // TODO: check ID for add/ update
}