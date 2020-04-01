import { SEARCH_ALBUMS } from "../types";

const INITIAL_STATE = {
  listOfAlbums: []
};

export const searchingReducer = (
  state = INITIAL_STATE,
  action: { type: typeof SEARCH_ALBUMS; listOfAlbums: [] }
) => {
  switch (action.type) {
    case SEARCH_ALBUMS:
      return {
        ...state,
        listOfAlbums: action.listOfAlbums
      };
    default:
      return state;
  }
};
