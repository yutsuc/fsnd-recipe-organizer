# Recipe Organizer Backend

## Getting Started with Development

### Installing Dependencies

#### Python 3.8

Follow instructions to install the latest version of python for your platform in the
[python site](https://www.python.org/downloads/)

#### Virtual Enviornment

We recommend working within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organaized. Instructions for setting up a virual enviornment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

#### PIP Dependencies

Once you have your virtual environment setup and running, install dependencies by naviging to the `/backend` directory and running:

```bash
pip install -r requirements.txt
```

This will install all of the required packages we selected within the `requirements.txt` file.

##### Key Dependencies

* [Flask](http://flask.pocoo.org/)  is a lightweight backend microservices framework. Flask is required to handle requests and responses.

* [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM we'll use handle the lightweight sqlite database. You'll primarily work in app.py and can reference models.py. 

* [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross origin requests from our frontend server. 

## Database Setup
With Postgres running, from the backend folder in terminal run:
```
createdb -U postgres recipe-organizer
```

## Running the server

From within the `backend` directory first ensure you are working using your created virtual environment.

To run the server, execute:

```
source setup.sh
FLASK_APP=app.py FLASK_DEBUG=True flask run
```

Setting the `FLASK_DEBUG` variable to `True` will detect file changes and restart the server automatically.

Setting the `FLASK_APP` variable to `app.py` directs flask to use the `app.py` file to find the application. 

## Testing
To run the tests, run
```
python test_app.py
```

## API Reference
### Getting Started
The backend app is hosted at the default URL `http://127.0.0.1:5000`


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
            {"name": "water or milk", "quantity": 2/3, "unit": "cup"},
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
            {"name": "water or milk", "quantity": 2/3, "unit": "cup"},
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
    "recipe": {
        "recipeTitle": "Pancakes",
        "ingredients": [
            {"name": "pancake mix", "quantity": 1, "unit": "cup"},
            {"name": "water", "quantity": 2/3, "unit": "cup"},
        ],
        "instructions": "Whisk together pancake mix and water. Let batter sit for 2 minutes. Heat pancake griddle to 375F. Pour in batter. Cook for 1-1.5 minutes per side"
    }
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
            {"name": "water", "quantity": 2/3, "unit": "cup"},
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