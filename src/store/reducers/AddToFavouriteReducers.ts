import { ADD_ALBUM_TO_LIST, DELETE_ALBUM_FROM_LIST } from "../types";

interface IState {
  favouriteAlbums: [];
}

const local = localStorage.getItem("favouriteAlbums")
  ? localStorage.getItem("favouriteAlbums")
  : "";

const INITIAL_STATE: IState = {
  favouriteAlbums: local ? JSON.parse(local) : [],
};

interface IAction {
  type: string;
  albumIMG: string;
  albumID: string;
  albumName: string;
  artistName: string;
  tracks: [];
  spotifyAlbumURL: string;
}

export const addFavouriteAlbumReducer = (
  state = INITIAL_STATE,
  action: IAction
) => {
  switch (action.type) {
    case ADD_ALBUM_TO_LIST:
      const newAlbum = {
        albumIMG: action.albumIMG,
        albumID: action.albumID,
        albumName: action.albumName,
        artistName: action.artistName,
        tracks: action.tracks,
        spotifyAlbumURL: action.spotifyAlbumURL,
      };
      localStorage.setItem(
        "favouriteAlbums",
        JSON.stringify([...state.favouriteAlbums, newAlbum])
      );
      return {
        ...state,
        favouriteAlbums: [...state.favouriteAlbums, newAlbum],
      };
    case DELETE_ALBUM_FROM_LIST:
      const newListWithoutAlbum = state.favouriteAlbums.filter(
        (album: { albumID: string }) => album.albumID !== action.albumID
      );
      localStorage.setItem(
        "favouriteAlbums",
        JSON.stringify(newListWithoutAlbum)
      );
      return {
        ...state,
        favouriteAlbums: newListWithoutAlbum,
      };
    default:
      return state;
  }
};
