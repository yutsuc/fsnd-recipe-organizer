const API_URL = "http://127.0.0.1:5000";
const token = localStorage.getItem("jwt_token");

export function _getRecipes() {
    fetch(`${API_URL}/recipes`, {
        method: "GET"
    })
}

async function _addRecipe(recipe, owner) {
    fetch(`${API_URL}/recipes`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        }

    })
}

function _updateRecipe(recipe) {
    fetch(`${API_URL}/recipes`, {
        method: "PATCH",
    })
}

export async function _saveRecipe(recipe, owner) {
    if (recipe.id === -1 )
        return _addRecipe(recipe, owner)
    else
        return _updateRecipe(recipe, owner)
}