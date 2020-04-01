import { authorizationReducers } from "./AuthorizationReducers";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  authorization: authorizationReducers
});
