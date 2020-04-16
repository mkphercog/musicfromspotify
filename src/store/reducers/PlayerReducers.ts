import {
  SET_CURRENT_TRACK,
  STOP_PLAYING_TRACK,
  PLAY_CURRENT_TRACK,
  PAUSE_PLAYING_TRACK,
  NEXT_PREV_TRACK,
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
  tracks: [],
  trackCurrentTime: 0,
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
        tracks: action.tracks,
        trackCurrentTime: player.currentTime,
      };
    case PLAY_CURRENT_TRACK:
      if (player.src !== "https://p.scdn.co/mp3-preview/") player.play();
      return { ...state, isPlaying: true };

    case STOP_PLAYING_TRACK:
      player.pause();
      return {
        ...state,
        currentTrackName: "",
        currentTrackURL: "",
        isPlaying: false,
        currentTrackNumber: "",
        allTracksInAlbum: 0,
        currentAlbumArtist: "",
        tracks: [],
        trackCurrentTime: 0,
      };

    case PAUSE_PLAYING_TRACK:
      player.pause();
      return {
        ...state,
        isPlaying: false,
        trackCurrentTime: player.currentTime,
      };

    case NEXT_PREV_TRACK:
      const src = action.currentTrackURL
        ? action.currentTrackURL
        : "https://p.scdn.co/mp3-preview/";
      player.src = src;
      return {
        ...state,
        currentTrackName: action.currentTrackName,
        currentTrackURL: src,
        currentTrackNumber: action.currentTrackNumber,
        trackCurrentTime: 0,
      };

    default:
      return state;
  }
};
