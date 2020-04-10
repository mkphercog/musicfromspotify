import { SET_AND_PLAY_CURRENT_TRACK, STOP_PLAYING_TRACK } from "../types";

export const setAndPlayCurrentTrack = (currentTrackURL: string) => {
  return {
    type: SET_AND_PLAY_CURRENT_TRACK,
    currentTrackURL: currentTrackURL,
  };
};

export const stopMusic = () => {
  return {
    type: STOP_PLAYING_TRACK,
  };
};
