import { authorizationReducers } from "./AuthorizationReducers";
import { searchingReducer } from "./SearchingReducers";
import { addFavouriteAlbumReducer } from "./AddToFavouriteReducers";
import { currentTrackReducer } from "./PlayerReducers";
import { albumDetailsReducer } from "./AlbumDetailsReducers";
import { dataFetchReducer } from "./FetchDataReducers";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  authorization: authorizationReducers,
  searching: searchingReducer,
  favouriteAlbums: addFavouriteAlbumReducer,
  player: currentTrackReducer,
  albumDetails: albumDetailsReducer,
  fetchData: dataFetchReducer,
});
