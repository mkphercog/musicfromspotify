import { SET_AND_PLAY_CURRENT_TRACK, STOP_PLAYING_TRACK } from "../types";
const player = new Audio();

export const setAndPlayCurrentTrack = (trackURL: string) => {
  player.src = trackURL;
  player.play();
  return {
    type: SET_AND_PLAY_CURRENT_TRACK,
    trackURL: trackURL,
  };
};

export const stopMusic = () => {
  player.pause();
  return {
    type: STOP_PLAYING_TRACK,
  };
};
