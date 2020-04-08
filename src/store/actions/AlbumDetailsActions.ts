import {
  SHOW_ALBUM_DETAILS,
  HIDE_ALBUM_DETAILS,
  SET_ALBUM_DETAILS,
} from "../types";
import { AlbumDetails } from "../storeInterfaces";

export const showAlbumDetails = () => ({
  type: SHOW_ALBUM_DETAILS,
  isAlbumDetailsVisible: true,
});

export const hideAlbumDetails = () => ({
  type: HIDE_ALBUM_DETAILS,
  isAlbumDetailsVisible: false,
});

export const setAlbumDetails = (albumDetails: AlbumDetails) => ({
  type: SET_ALBUM_DETAILS,
  albumDetails: albumDetails,
});
