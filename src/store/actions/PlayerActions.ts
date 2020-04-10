import { SET_AND_PLAY_CURRENT_TRACK, STOP_PLAYING_TRACK } from "../types";
import { Track } from "../storeInterfaces";

export const setAndPlayCurrentTrack = (
  track: Track,
  allTracksInAlbum: number
) => {
  return {
    type: SET_AND_PLAY_CURRENT_TRACK,
    currentTrackName: track.name,
    currentTrackURL: track.preview_url,
    currentTrackNumber: track.track_number,
    allTracksInAlbum: allTracksInAlbum,
  };
};

export const stopMusic = () => {
  return {
    type: STOP_PLAYING_TRACK,
  };
};
