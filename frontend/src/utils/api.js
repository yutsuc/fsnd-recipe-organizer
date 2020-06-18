const API_URL = "";

export function getRecipes() {
    fetch(`${API_URL}/recipes`, {
        method: "GET"
    })
}

export function getRecipe(id) {
    fetch(`${API_URL}/recipes/${id}`, {
        method: "GET"
    })
}