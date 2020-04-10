import { SET_AND_PLAY_CURRENT_TRACK, STOP_PLAYING_TRACK } from "../types";
import { GlobalState, GlobalAction } from "../storeInterfaces";

const player = new Audio();

const INITIAL_STATE: GlobalState = {
  currentTrackName: "",
  currentTrackURL: "",
  isPlaying: false,
  currentTrackNumber: 0,
  allTracksInAlbum: 0,
  albumTracksURLs: [],
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
        currentTrackURL: action.currentTrackURL,
        isPlaying: true,
      };

    case STOP_PLAYING_TRACK:
      player.pause();
      return {
        ...state,
        currentTrackURL: "",
        isPlaying: false,
      };

    default:
      return state;
  }
};
