import {
  SET_CURRENT_TRACK,
  STOP_PLAYING_TRACK,
  PLAY_CURRENT_TRACK,
  NEXT_TRACK,
} from "../types";
import { GlobalState, GlobalAction } from "../storeInterfaces";

const player = new Audio();

const INITIAL_STATE: GlobalState = {
  currentTrackName: "",
  currentTrackURL: "",
  isPlaying: false,
  currentTrackNumber: 0,
  allTracksInAlbum: 0,
  currentAlbumArtist: "",
  tracksURLs: [],
};

export const currentTrackReducer = (
  state = INITIAL_STATE,
  action: GlobalAction
) => {
  switch (action.type) {
    case SET_CURRENT_TRACK:
      player.src = action.currentTrackURL;

      return {
        ...state,
        currentTrackName: action.currentTrackName,
        currentTrackURL: action.currentTrackURL,
        isPlaying: false,
        currentTrackNumber: action.currentTrackNumber,
        allTracksInAlbum: action.allTracksInAlbum,
        currentAlbumArtist: action.currentAlbumArtist,
        tracksURLs: action.tracksURLs,
      };
    case PLAY_CURRENT_TRACK:
      player.play();
      return { ...state, isPlaying: true };

    case STOP_PLAYING_TRACK:
      player.pause();
      return {
        ...state,
        // currentTrackName: "",
        // currentTrackURL: "",
        isPlaying: false,
        // currentTrackNumber: "",
        // allTracksInAlbum: 0,
        // currentAlbumArtist: "",
        // tracksURLs: [],
      };

    case NEXT_TRACK:
      player.src = action.currentTrackURL;
      return {
        ...state,
        currentTrackName: action.currentTrackName,
        currentTrackURL: action.currentTrackURL,
        currentTrackNumber: action.currentTrackNumber,
      };

    default:
      return state;
  }
};
