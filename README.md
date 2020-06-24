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

React-based. More information can be found: [`./frontend/`](./frontend/README.md)

### Backend

Flask-based. More information can be found: [`./backend/`](./backend/README.md)

## Licenses

This repository is licenced under [GNU GPLv3](https://spdx.org/licenses/GPL-3.0-or-later.html)