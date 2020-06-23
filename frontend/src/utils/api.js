const API_URL = "http://127.0.0.1:5000";
const token = localStorage.getItem("jwt_token");

export function _getRecipes() {
    return fetch(`${API_URL}/recipes`, {
        method: "GET"
    }).then(response => response.json()).then(data => {
        if (data.success) {
            return data.recipes;
        }
    }).catch(error => {
        console.log(error)
    });
}

export function _getRecipesDetail() {
    return fetch(`${API_URL}/recipes-detail`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then(response => response.json()).then(data => {
        if (data.success) {
            return data.recipes;
        }
    }).catch(error => {
        console.log(error)
    });
}

function _addRecipe(recipe, owner) {
    return fetch(`${API_URL}/recipes`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipe, owner })
    }).then(response => response.json()).then(data => {
        if (data.success) {
            return data.recipe;
        }
    }).catch(error => {
        console.log(error)
    });
}

function _updateRecipe(recipe) {
    return fetch(`${API_URL}/recipes/${recipe.id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe)
    }).then(response => response.json()).then(data => {
        if (data.success) {
            return data.recipe;
        }
    }).catch(error => {
        console.log(error)
    });
}

export function _saveRecipe(recipe, owner) {
    if (recipe.id === -1)
        return _addRecipe(recipe, owner)
    else
        return _updateRecipe(recipe)
}

export function _deleteRecipe(id) {
    return fetch(`${API_URL}/recipes/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then(response => response.json()).then(data => {
        if (data.success) {
            return data.delete;
        }
    }).catch(error => {
        console.log(error)
    });
}