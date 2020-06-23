# Recipe Organizer

This app is the popular Would You Rather...? game. It allows you to create questions and see results for each question, and has a leaderboard that captures which user has been most active.

## TL;DR

To get started developing right away:

* change to frontend folder with `cd frontend`
* install all project dependencies with `npm install`
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
    │   ├── App.js # Routes different paths to different components
    │   ├── Dashboard.js # Displays a list of Questions separated by answered and unanswered
    │   ├── Leaderboard.js # Displays a list of User Summary
    │   ├── Login.js # User gets redirected to this page if they are not logged in
    │   ├── Nav.js # Navigaton component that links to different components
    │   ├── NewQuestion.js # Component for creating a new question
    │   ├── Question.js # Displays question preview and a button to vote
    │   ├── QuestionPage.js # Component for voting a single question or summary of the votes
    │   ├── QuesitonSummary.js # Displays a question's votes for each option
    │   ├── QuestionVote.js # Votes for the question
    │   └── UserSummary.js # Displays # of questions answered and created by each user and their total score
    ├── middleware # Redux-Thunk and logging action and state
    │   ├── index.js
    │   └── logger.js
    ├── reducers # Handling various states returned from actions
    │   ├── authedUser.js
    │   ├── index.js
    │   └── recipes.js
    ├── utils
    │   ├── api.js # API calls
    │   └── react-auth0-spa.js # Auth0 context and hooks
    ├── auth_config.json # Auth0 config
    ├── index.css
    └── index.js # Create Redux store, Auth0 Provider, Router
```

## Possible Imporovements
- backend database
- ability to create new user

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Licenses

This repository is licenced under [GNU GPLv3](https://spdx.org/licenses/GPL-3.0-or-later.html)