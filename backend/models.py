from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
import json

database_path = os.environ['DATABASE_URL']
db = SQLAlchemy()

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''
def setup_db(app):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    # db.drop_all() # TODO: uncomment to drop all db if requires re-setup
    # db.create_all() # TODO: uncomment to create all db on initial setup
    migrate = Migrate(app, db)

'''
Recipe
    Recipe entity, extends the base SQLAlchemy Model
'''
class Recipe(db.Model):
    __tablename__ = "recipe"
    # Autoincrementing, unique primary key
    id = db.Column(db.Integer, primary_key=True)
    # String Title
    title = db.Column(db.String(120), unique=True, nullable=False)
    # the ingredients blob - this stores a lazy json blob
    # the required datatype is [{'name': string, 'quantity':number, 'unit':string}]
    ingridients = db.Column(db.String(), nullable=False)
    # String Instructions
    instructions = db.Column(db.String(), nullable=True)
    # Integer Owner
    owner_id = db.Column(db.Integer, db.ForeignKey("appuser.id", ondelete="CASCADE"))

    def __repr__(self):
        return f"<Recipe id: {self.id}, title: {self.title}, ingridients: {json.loads(self.ingridients)}, instructions: {self.instructions} >"

    '''
    short()
        short form representation of the Recipe model
    '''
    def short(self):
        return {
            "id": self.id,
            "title": self.title
        }

    '''
    long()
        long form representation of the Recipe model
    '''
    def long(self):
        return {
            "id": self.id,
            "title": self.title,
            "ingridients": json.loads(self.ingridients),
            "instructions": self.instructions,
        }

    '''
    insert()
        inserts a new model into a database
        the model must have a unique id or null id
        the model must have a unique title
        EXAMPLE
            recipe = Recipe(title=req_title, ingridients=req_ingridients, instructions=req_instructions)
            recipe.insert()
    '''
    def insert(self):
        db.sesion.add(self)
        db.session.commit()

    '''
    delete()
        deletes a model from a database
        the model must exist in the database
        EXAMPLE
            recipe = Recipe.query.get(1)
            recipe.delete()
    '''
    def delete(self):
        db.session.remove(self)
        db.session.commit()

    '''
    update()
        updates a model into a database
        the model must exist in the database
        EXAMPLE
            recipe = Recipe.query.filter(Recipe.id == id).one_or_none()
            recipe.title = 'Green Tea Tiramisu'
            recipe.update()
    '''
    def update(self):
        db.session.commit()

    # '''
    # format()
    # '''
    # def format(self):
    #     return {self.id: {
    #         "id": self.id,
    #         "title": self.title,
    #         "ingridients": self.ingridients,
    #         "instructions": self.instructions,
    #     }}

'''
AppUser
    AppUser entity, extends the base SQLAlchemy Model
'''
class AppUser(db.Model):
    __tablename__  = "appuser"
    # Autoincrementing, unique primary key
    id = db.Column(db.Integer, primary_key=True)
    # String name
    name = db.Column(db.String(), unique=True, nullable=False)
    # One to many relationship
    recipes = db.relationship(Recipe, single_parent=True, backref=db.backref("owner", lazy="joined"))

    def __repr__(self):
        return f"<AppUser id: {self.id}, name: {self.name} >"
