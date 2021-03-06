from flask import Flask, request, abort, jsonify
from flask_cors import CORS
import json
from models import AppUser, Recipe, setup_db
from auth import requires_auth

app = Flask(__name__)
setup_db(app)
CORS(app)

# ROUTES

'''
GET /recipes
    it should be a public endpoint
    it should contain only the recipe.short() data representation
returns status code 200 and json {"success": True, "recipes": recipes} where recipes is the list of recipes
    or appropriate status code indicating reason for failure
'''
@app.route("/recipes")
def retrieve_recipes():
    all_recipes = Recipe.query.order_by("title").all()
    recipes = [r.short() for r in all_recipes]

    if len(recipes) == 0:
        abort(404)

    return jsonify({
        "success": True,
        "recipes": recipes,
    })

'''
GET /recipes-detail
    it should require the "get:recipes-detail" permission
    it should contain the recipe.long() data representation
returns status code 200 and json {"success": True, "recipes": recipes} where recipes is the list of recipes
    or appropriate status code indicating reason for failure
'''
@app.route("/recipes-detail")
@requires_auth("get:recipes-detail")
def retrieve_recipes_detail():
    all_recipes = Recipe.query.order_by("title").all()
    recipes = [r.long() for r in all_recipes]

    if len(recipes) == 0:
        abort(404)

    return jsonify({
        "success": True,
        "recipes": recipes,
    })

'''
POST /recipes
    it should create a new row in the recipe table
    it should require the "post:recipe" permission
    it should contain the recipe.long() data representation
returns status code 200 and json {"success": True, "recipe": recipe} where recipe is the newly created recipe
    or appropriate status code indicating reason for failure
'''
@app.route("/recipes", methods=["POST"])
@requires_auth("post:recipe")
def create_recipe():
    data = request.get_json()
    recipe = data.get("recipe")
    owner = data.get("owner")

    user = AppUser.query.filter(AppUser.name == owner).first()

    if user is None:
        user = AppUser(name=owner)
        try:
            user.insert()
        except:
            abort(422)

    title = recipe.get("recipeTitle")
    ingredients = json.dumps(recipe.get("ingredients", ""))
    instructions = recipe.get("instructions")
    recipe = Recipe(title=title, ingredients=ingredients, instructions=instructions, owner_id=user.id)

    try:
        recipe.insert()
    except:
        abort(422)

    return jsonify({
        "success": True,
        "recipe": recipe.long(),
    })

'''
PATCH /recipes/<recipe_id>
    where <recipe_id> is the existing model id
    it should respond with a 404 error if <recipe_id> is not found
    it should update the corresponding row for <recipe_id>
    it should require the "patch:recipes" permission
    it should contain the recipe.long() data representation
returns status code 200 and json {"success": True, "recipes": recipe} where recipe is the updated recipe
    or appropriate status code indicating reason for failure
'''
@app.route("/recipes/<int:recipe_id>", methods=["PATCH"])
@requires_auth("patch:recipes")
def update_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)

    if recipe is None:
        abort(404)

    data = request.get_json()
    recipe.title = data.get("recipeTitle")
    recipe.ingredients = json.dumps(data.get("ingredients", ""))
    recipe.instructions = data.get("instructions")

    try:
        recipe.update()
    except:
        abort(422)

    return jsonify({
        "success": True,
        "recipe": recipe.long(),
    })

'''
DELETE /recipes/<recipe_id>
    where <recipe_id> is the existing model id
    it should respond with a 404 error if <recipe_id> is not found
    it should delete the corresponding row for <recipe_id>
    it should require the "delete:recipe" permission
returns status code 200 and json {"success": True, "delete": id where id is the id of the deleted record
    or appropriate status code indicating reason for failure
'''
@app.route("/recipes/<int:recipe_id>", methods=["DELETE"])
@requires_auth("delete:recipe")
def delete_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)

    if recipe is None:
        abort(404)

    try:
        recipe.delete()
    except Exception as err:
        print(err)
        abort(422)

    return jsonify({
        "success": True,
        "delete": recipe_id
    })


# Error Handling

'''
Error handling for 400 bad request
'''
@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        "success": False,
        "error": 400,
        "message": "bad request"
    }), 400

'''
Error handler for 401 AuthError
'''
@app.errorhandler(401)
def unauthorized(error):
    return jsonify({
        "success": False,
        "error": 401,
        "message": str(error)
    }), 401

'''
Error handling for 404 not found
'''
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "success": False,
        "error": 404,
        "message": "not found"
    }), 404

'''
Error handling for 422 unprocessable
'''
@app.errorhandler(422)
def unprocessable(errpr):
    return jsonify({
        "success": False,
        "error": 422,
        "message": "unprocessable"
    }), 422

'''
Error handling for 500 internal server error
'''
@app.errorhandler(500)
def internal_server_error(error):
    return jsonify({
        "success": False,
        "error": 500,
        "message": "internal server error"
    }), 500

