import { authorizationReducers } from "./AuthorizationReducers";
import { searchingReducer } from "./SearchingReducers";
import { addFavouriteAlbumReducer } from "./AddToFavouriteReducers";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  authorization: authorizationReducers,
  searching: searchingReducer,
  favouriteAlbums: addFavouriteAlbumReducer
});
