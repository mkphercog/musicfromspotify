import {
  SHOW_ALBUM_DETAILS,
  HIDE_ALBUM_DETAILS,
  SET_ALBUM_DETAILS,
} from "../types";
import { GlobalState, GlobalAction } from "../storeInterfaces";

const INITIAL_STATE: GlobalState = {
  isAlbumDetailsVisible: false,
  albumDetails: {
    albumIMG: "",
    albumID: "",
    albumName: "",
    artistName: "",
    tracks: [],
    spotifyAlbumURL: "",
  },
};

export const albumDetailsReducer = (
  state = INITIAL_STATE,
  action: GlobalAction
) => {
  switch (action.type) {
    case SHOW_ALBUM_DETAILS:
      return {
        ...state,
        isAlbumDetailsVisible: action.isAlbumDetailsVisible,
      };

    case HIDE_ALBUM_DETAILS:
      return {
        ...state,
        isAlbumDetailsVisible: action.isAlbumDetailsVisible,
      };

    case SET_ALBUM_DETAILS:
      return {
        ...state,
        albumDetails: action.albumDetails,
      };

    default:
      return state;
  }
};
