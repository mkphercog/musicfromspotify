import { SET_AND_PLAY_CURRENT_TRACK, STOP_PLAYING_TRACK } from "../types";
const player = new Audio();

const INITIAL_STATE = {
  trackURL: "",
  isPlaying: false,
};

interface Album {
  type: string;
  trackURL: string;
}

export const currentTrackReducer = (state = INITIAL_STATE, action: Album) => {
  switch (action.type) {
    case SET_AND_PLAY_CURRENT_TRACK:
      player.src = action.trackURL;
      player.play();
      return {
        ...state,
        trackURL: action.trackURL,
        isPlaying: true,
      };
    case STOP_PLAYING_TRACK:
      player.pause();
      return {
        ...state,
        trackURL: "",
        isPlaying: false,
      };
    default:
      return state;
  }
};
