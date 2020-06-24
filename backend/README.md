# Recipe Organizer Backend

## Getting Started with Development

Development API is hosted on http://127.0.0.1:5000

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
flask db upgrade
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


## Setup Auth0

1. Create a new Auth0 Account
2. Select a unique tenant domain
3. Create a new, single page web application
4. Create a new API
    - in API Settings:
        - Enable RBAC
        - Enable Add Permissions in the Access Token
5. Create new API permissions:
    - `get:recipes-detail`
    - `post:recipe`
    - `patch:recipes`
    - `delete:recipe`
6. Create new roles for:
    - User
        - can `get:recipes-detail`, `post:recipe`
    - Admin
        - can perform all actions
7. Test your endpoints with [Postman](https://getpostman.com)
    - Register 2 users - assign the User role to one and Admin role to the other
    - Sign into each account and make note of the JWT (can be found on frontend `/profile`)
    - Import the postman collection `./backend/recipe-organizer-api.postman_collection.json`
    - Change the host url in collection variable to `http://127.0.0.1:5000`
    - Right-clicking the collection folder for user and admin, navigate to the authorization tab, and including the JWT in the token field (you should have noted these JWTs)
    - Run the collection and correct any errors