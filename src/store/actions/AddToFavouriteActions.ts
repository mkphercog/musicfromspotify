import { ADD_ALBUM_TO_LIST, DELETE_ALBUM_FROM_LIST } from "../types";
import { AlbumDetails } from "../storeInterfaces";

export const addAlbumToFavourite = (album: AlbumDetails) => ({
  type: ADD_ALBUM_TO_LIST,
  albumIMG: album.albumIMG,
  albumID: album.albumID,
  albumName: album.albumName,
  artistName: album.artistName,
  tracks: album.tracks,
  spotifyAlbumURL: album.spotifyAlbumURL,
});

export const deleteAlbumFromList = (albumID: string) => ({
  type: DELETE_ALBUM_FROM_LIST,
  albumID: albumID,
});
