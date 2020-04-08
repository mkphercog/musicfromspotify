import {
  SEARCH_ALBUMS,
  SHOW_SEARCH_RESULTS,
  HIDE_SEARCH_RESULTS,
} from "../types";
import { GlobalState, GlobalAction } from "../storeInterfaces";

const INITIAL_STATE: GlobalState = {
  listOfAlbums: [],
  isSearchResultsVisible: false,
};

export const searchingReducer = (
  state = INITIAL_STATE,
  action: GlobalAction
) => {
  switch (action.type) {
    case SHOW_SEARCH_RESULTS:
      return {
        ...state,
        isSearchResultsVisible: action.isSearchResultsVisible,
      };
    case HIDE_SEARCH_RESULTS:
      return {
        ...state,
        isSearchResultsVisible: action.isSearchResultsVisible,
      };
    case SEARCH_ALBUMS:
      return {
        ...state,
        listOfAlbums: action.listOfAlbums,
      };
    default:
      return state;
  }
};
