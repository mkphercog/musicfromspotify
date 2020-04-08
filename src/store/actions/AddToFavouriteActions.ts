import { ADD_ALBUM_TO_LIST, DELETE_ALBUM_FROM_LIST } from "../types";

type FavouriteAlbum = (
  albumIMG: string,
  albumID: string,
  albumName: string,
  artistName: string,
  tracks: [],
  spotifyAlbumURL: string
) => {};

export const addAlbumToFavourite: FavouriteAlbum = (
  albumIMG,
  albumID,
  albumName,
  artistName,
  tracks,
  spotifyAlbumURL
) => ({
  type: ADD_ALBUM_TO_LIST,
  albumIMG: albumIMG,
  albumID: albumID,
  albumName: albumName,
  artistName: artistName,
  tracks: tracks,
  spotifyAlbumURL: spotifyAlbumURL,
});

export const deleteAlbumFromList = (albumID: string) => ({
  type: DELETE_ALBUM_FROM_LIST,
  albumID: albumID,
});