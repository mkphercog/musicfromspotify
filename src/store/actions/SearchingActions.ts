import {
  SEARCH_ALBUMS,
  SHOW_SEARCH_RESULTS,
  HIDE_SEARCH_RESULTS,
} from "../types";

export const searchAlbums = (listOfAlbums: []) => ({
  type: SEARCH_ALBUMS,
  listOfAlbums: listOfAlbums,
});

export const showSearchResults = () => ({
  type: SHOW_SEARCH_RESULTS,
  isSearchResultsVisible: true,
});

export const hideSearchResults = () => ({
  type: HIDE_SEARCH_RESULTS,
  isSearchResultsVisible: false,
});
