import {
  SET_CURRENT_TRACK,
  STOP_PLAYING_TRACK,
  PLAY_CURRENT_TRACK,
  PAUSE_PLAYING_TRACK,
  NEXT_TRACK,
} from "../types";
import { Track, AlbumDetails } from "../storeInterfaces";

export const setCurrentTrack = (track: Track, albumDetails: AlbumDetails) => {
  return {
    type: SET_CURRENT_TRACK,
    currentTrackName: track.name,
    currentTrackURL: track.preview_url,
    currentTrackNumber: track.track_number,
    allTracksInAlbum: albumDetails.totalTracks,
    currentAlbumArtist: albumDetails.artistName,
    tracks: albumDetails.tracks,
  };
};

export const playMusic = () => {
  return {
    type: PLAY_CURRENT_TRACK,
  };
};

export const stopMusic = () => {
  return {
    type: STOP_PLAYING_TRACK,
  };
};

export const pauseMusic = () => {
  return {
    type: PAUSE_PLAYING_TRACK,
  };
};

export const nextTrack = (
  currentTrackName: string,
  currentTrackURL: string,
  currentTrackNumber: number
) => {
  return {
    type: NEXT_TRACK,
    currentTrackName: currentTrackName,
    currentTrackURL: currentTrackURL,
    currentTrackNumber: currentTrackNumber,
  };
};
