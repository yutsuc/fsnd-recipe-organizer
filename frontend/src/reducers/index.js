import { combineReducers } from "redux";
import authedUser from "./authedUser";
import recipes from "./recipes";

export default combineReducers({ authedUser, recipes });