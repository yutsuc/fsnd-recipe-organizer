# Recipe Organizer



## Motivation

Besides coding, I bake a lot. Sometimes I find it difficult to track and make changes to the recipe. I have decided to solve this problem by creating my own recipe organizer!

This application has the following functions:

1. Display recipes
2. Allow public users to view only the titles
3. Allow the registered users to see the detailed recipes and create new ones
4. Allow the admin to delete or make updates to the recipes

## RBAC

Users can:
* `get:recipes-detail`
* `post:recipe`

Admins can:
* `get:recipes-detail`
* `post:recipe`
* `patch:recipes`
* `delete:recipe`

## About the Stack

### Frontend

React-based. More information on how to run the dev server can be found: [`./frontend/`](./frontend/README.md)

### Backend

Hosted on https://recipe-organizer-api.herokuapp.com

Flask-based. More information on how to run the dev server can be found: [`./backend/`](./backend/README.md)

## Testing with [Postman](https://getpostman.com)
- Import the postman collection `./backend/recipe-organizer-api.postman_collection.json`
- Make sure the host url in collection variable to `https://recipe-organizer-api.herokuapp.com`
- Run the collection

> _tip_: if JWT tokens are expired, they can be obtained from the frontend `/profile`. Right-clicking the collection folder for user and admin, navigate to the authorization tab, and update the JWT in the token field

## API Reference
### Error Handling
Errors are returned as JSON object in the following format
```
{
    "success": False,
    "error": 400,
    "message": "Bad Request"
}
```
The API will return three error types when the requests fail
* 400 Bad Request
* 401 Unauthorized
* 404 Not Found
* 422 Unprocessable
* 500 Internal Server Error

### GET `"/recipes"`
* Fetches a list of recipe id and title
* Request Arguments: None
* Permission: None
* Returns: 
    
    success: Boolean value indicating the request was successful
    
    recipes: An array of objects with id and title
```
{
    "success": True,
    "recipes": [
        {"id": 1, "title": "Chocolate Chips Cookie"},
        {"id": 2, "title": "Tiramisu"}
    ]
}
```

### GET `"/recipes-detail"`
* Fetches a list of recipes 
* Request Arguments: None
* Permission: `"get:recipes-detail"`
* Returns: 
    
    success: Boolean value indicating the request was successful
    
    recipes: An array of recipe objects
```
{
    "success": True,
    "recipes": [
        {   "id": 1,
            "title": "Chocolate Chips Cookie",
            "ingredients": [
                {"name": "chocolate chips", "quantity": 1, "unit": "cup"},
                {"name": "all purpose flour", "quantity": 2, "unit": "cups"},
                {"name": "butter", "quantity": 4, "unit": "tablespoon"},
                {"name": "brown sugar", "quantity": 0.5, "unit": "cup"},
                {"name": "granulated sugar", "quantity": 0.5, "unit": "cup"},
                {"name": "egg", "quantity": 1, "unit": "piece"},
                {"name": "vanilla extract", "quantity": 0.5, "unit": "teaspoon"},
                {"name": "baking soda", "quantity": 0.5, "unit": "teaspoon"}
            ],
            "instructions": "Cream butter, both sugar, then add in egg and vanilla extract. Mix in all dry ingredients. Shape. Bake at 300F for 20 minutes",
            "owner_id": 1
        },
        {   "id": 2,
            "title": "Tiramisu",
            "ingredients": [
                {"name": "lady fingers", "quantity": 8, "unit": "pieces"},
                {"name": "mascarpone cheese (room temperature)", "quantity": 250, "unit": "g"},
                {"name": "granulated sugar", "quantity": 40, "unit": "g"},
                {"name": "espresso", "quantity": 25, "unit": "g"},
                {"name": "marsala wine", "quantity": 40, "unit": "g"},
                {"name": "egg", "quantity": 2, "unit": "pieces"},
                {"name": "cocoa powder", "quantity": 2, "unit": "tablespoon"}
            ],
            "instructions": "Separate egg yolks and egg whites. Mix espresso and marsala wine. Whip egg whites to soft peak. Whip egg yolks to pale yellow then mix with mascarpone cheese. Mix egg yolk mixture with whipped egg whites. Put a layer of lady fingers in the container. Brush on espresso and wine. Pour in some cheese mixture. Keep layering until no more ingredients. Rest in fridge for at least 3 hours. Dust with cocoa powder when ready to serve",
            "owner_id": 1
        }
    ]
}
```

### POST `"/recipes"`
* Creates a new recipe
* Request Arguments: None
* Permission: `"post:recipe"`
* Request Body:
    
    recipe: Object with attributes: recipeTitle, ingredients, instructions
    
    owner: email of the owner
    
```
{
    "recipe": {
        "recipeTitle": "Pancakes",
        "ingredients": [
            {"name": "pancake mix", "quantity": 1, "unit": "cup"},
            {"name": "water or milk", "quantity": "2/3", "unit": "cup"}
        ],
        "instructions": "Whisk together pancake mix and water. Let batter sit for 2 minutes. Heat pancake griddle to 375F. Pour in batter. Cook for 1-1.5 minutes per side"
    },
    "owner": "owner@recipeowner.com"
}
```
* Returns: 
    
    success: Boolean value indicating the request was successful

    recipes: Newly created recipe
```
{
    "success": True,
    "recipe": {
        "id": 3,
        "title": "Pancakes",
        "ingredients": [
            {"name": "pancake mix", "quantity": 1, "unit": "cup"},
            {"name": "water or milk", "quantity": "2/3", "unit": "cup"}
        ],
        "instructions": "Whisk together pancake mix and water. Let batter sit for 2 minutes. Heat pancake griddle to 375F. Pour in batter. Cook for 1-1.5 minutes per side",
        "owner_id": 2
    }
}
```

### PATCH `"/recipes/<int:recipe_id>"`
* Updates the given recipe in the database
* Request Arguments: None
* Request variable: Integer value indicating the recipe ID
* Permission: `"patch:recipes"`
* Request Body:
    
    recipe: Object with attributes: recipeTitle, ingredients, instructions
    
```
{
    "recipeTitle": "Pancakes",
    "ingredients": [
        {"name": "pancake mix", "quantity": 1, "unit": "cup"},
        {"name": "water", "quantity": "2/3", "unit": "cup"}
    ],
    "instructions": "Whisk together pancake mix and water. Let batter sit for 2 minutes. Heat pancake griddle to 375F. Pour in batter. Cook for 1-1.5 minutes per side"
}
```
* Returns: 

    success: Boolean value indicating the request was successful

    recipes: Updated recipe
```
{
    "success": True,
    "recipe": {
        "id": 3,
        "title": "Pancakes",
        "ingredients": [
            {"name": "pancake mix", "quantity": 1, "unit": "cup"},
            {"name": "water", "quantity": "2/3", "unit": "cup"}
        ],
        "instructions": "Whisk together pancake mix and water. Let batter sit for 2 minutes. Heat pancake griddle to 375F. Pour in batter. Cook for 1-1.5 minutes per side",
        "owner_id": 2
    }
}
```

### DELETE `"/recipes/<int:recipe_id>"`
* Removes the given recipe from the database
* Request Arguments: None
* Request variable: Integer value indicating the recipe ID
* Permission: `"delete:recipe"`
* Returns: 

    success: Boolean value indicating the request was successful

    delete: ID of the recipe deleted
```
{
    "success": True,
    "delete": 3
}
```

## Licenses

This repository is licenced under [GNU GPLv3](https://spdx.org/licenses/GPL-3.0-or-later.html)