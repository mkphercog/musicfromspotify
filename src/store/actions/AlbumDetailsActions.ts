import {
  SHOW_ALBUM_DETAILS,
  HIDE_ALBUM_DETAILS,
  SET_ALBUM_DETAILS,
} from "../types";

export const showAlbumDetails = () => ({
  type: SHOW_ALBUM_DETAILS,
  isAlbumDetailsVisible: true,
});

export const hideAlbumDetails = () => ({
  type: HIDE_ALBUM_DETAILS,
  isAlbumDetailsVisible: false,
});

interface AlbumDetails {
  albumIMG: string;
  albumID: string;
  albumName: string;
  artistName: string;
  tracks: any[];
  spotifyAlbumURL: string;
}

export const setAlbumDetails = (albumDetails: AlbumDetails) => ({
  type: SET_ALBUM_DETAILS,
  albumDetails: albumDetails,
});
