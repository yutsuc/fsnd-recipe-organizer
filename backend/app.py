from flask import Flask, request, abort, jsonify
from flask_cors import CORS

from models import Recipe, setup_db
from auth import requires_auth

app = Flask(__name__)
setup_db(app)
CORS(app)

# ROUTES
@app.route("/recipes")
def retrieve_recipes():
    recipes = Recipe.get.all()

    if len(recipes) == 0:
        abort(404)

    return jsonify({
        "success": True,
        "recipes": recipes,
    })


@app.route("/recipes/<int:recipe_id>")
def retrive_recipe(recipe_id):
    recipe = Recipe.query.get(recipe_id)

    if recipe_id is None:
        abort(404)

    return jsonify({
        "success": True,
        "recipe": recipe,
    })


'''
DELETE /recipes/<int:recipe_id>
    where <recipe_id> is the existing model id
    it should respond with a 404 error if <recipe_id> is not found
    it should delete the corresponding row for <recipe_id>
    it should require the 'delete:recipe' permission
returns status code 200 and json {"success": True, "delete": recipe_id} where recipe_id is the id of the deleted record
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
    except:
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

