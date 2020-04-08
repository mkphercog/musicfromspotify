import {
  SEARCH_ALBUMS,
  SHOW_SEARCH_RESULTS,
  HIDE_SEARCH_RESULTS,
} from "../types";

const INITIAL_STATE = {
  listOfAlbums: [],
  isAlbumDetailsVisible: false,
};

export const searchingReducer = (
  state = INITIAL_STATE,
  action: { type: string; listOfAlbums: []; isSearchResultsVisible: boolean }
) => {
  switch (action.type) {
    case SHOW_SEARCH_RESULTS:
      return {
        ...state,
        isAlbumDetailsVisible: action.isSearchResultsVisible,
      };
    case HIDE_SEARCH_RESULTS:
      return {
        ...state,
        isAlbumDetailsVisible: action.isSearchResultsVisible,
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
