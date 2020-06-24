# Recipe Organizer Frontend

This app allows you to create new recipe. Admin can delete and update recipes

> _tip_: this frontend is designed to work with [Flask-based Backend](../backend). It is recommended you stand up the backend first, test using Postman, and then the frontend should integrate smoothly.

## TL;DR

To get started developing right away:

* change to frontend folder with `cd frontend`
* download and install [npm and npm](https://www.npmjs.com/get-npm)
* install all project dependencies with `npm install`
* update Auth0 variables [`.src/auth_config.json`](./src/auth_config.json)
* start the development server with `npm start`

## What You're Getting
```bash
├── README.md # This file.
├── package.json
├── public
│   ├── favicon.icon
│   ├── index.html
│   └── manifest.json
└── src
    ├── actions # Actions and action creators
    │   ├── authedUser.js
    │   └── recipes.js
    ├── components
    │   ├── AddIngredientDialog.js # Dialog for adding an ingredient
    │   ├── AddRecipe.js # Display an empty form for adding new recipe
    │   ├── App.js # Routes different paths to different components
    │   ├── IngredientsTable.js # Display ingredients
    │   ├── PrivateRoute.js # Route with Auth0 redirect
    │   ├── Profile.js # Display Auth0 user information and JWT token
    │   ├── Recipe.js # Displays recipe
    │   ├── RecipeForm.js # Component for creating or editing a recipe
    │   └── RecipesDrawer.js # Displays list of recipe titles
    ├── middleware # Redux-Thunk and logging action and state
    │   ├── index.js
    │   └── logger.js
    ├── reducers # Handling various states returned from actions
    │   ├── authedUser.js
    │   ├── index.js
    │   └── recipes.js
    ├── utils
    │   ├── api.js # API calls
    │   ├── auth.js # Decode JWT token
    │   └── react-auth0-spa.js # Auth0 context and hooks
    ├── auth_config.json # Auth0 config
    ├── index.css
    └── index.js # Create Redux store, Auth0 Provider, Router
```

## Possible Imporovements
* ability to convert ingredients according to serving sizes

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).