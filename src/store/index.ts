import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers";

const devTools = composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(rootReducer, devTools);
