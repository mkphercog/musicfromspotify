import {
  SHOW_ALBUM_DETAILS,
  HIDE_ALBUM_DETAILS,
  SET_ALBUM_DETAILS,
} from "../types";

const INITIAL_STATE = {
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

interface Action {
  type: string;
  isAlbumDetailsVisible: boolean;
  albumDetails: {
    albumIMG: string;
    albumID: string;
    albumName: string;
    artistName: string;
    tracks: any[];
    spotifyAlbumURL: string;
  };
}

export const albumDetailsReducer = (state = INITIAL_STATE, action: Action) => {
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
