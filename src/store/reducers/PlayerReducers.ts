import { SET_AND_PLAY_CURRENT_TRACK, STOP_PLAYING_TRACK } from "../types";
import { GlobalState, GlobalAction } from "../storeInterfaces";

const player = new Audio();

const INITIAL_STATE: GlobalState = {
  currentTrackName: "",
  currentTrackURL: "",
  isPlaying: false,
  currentTrackNumber: 0,
  allTracksInAlbum: 0,
};

export const currentTrackReducer = (
  state = INITIAL_STATE,
  action: GlobalAction
) => {
  switch (action.type) {
    case SET_AND_PLAY_CURRENT_TRACK:
      player.src = action.currentTrackURL;
      player.play();
      return {
        ...state,
        currentTrackName: action.currentTrackName,
        currentTrackURL: action.currentTrackURL,
        isPlaying: true,
        currentTrackNumber: action.currentTrackNumber,
        allTracksInAlbum: action.allTracksInAlbum,
      };

    case STOP_PLAYING_TRACK:
      player.pause();
      return {
        ...state,
        currentTrackName: "",
        currentTrackURL: "",
        isPlaying: false,
        currentTrackNumber: "",
        allTracksInAlbum: 0,
      };

    default:
      return state;
  }
};
