interface AuthorizationState {
  access_token: string;
  refresh_token: string;
}

interface FetchState {
  featching: boolean;
  featched: boolean;
  error: boolean;
  errorMessage: string;
}

interface SearchState {
  listOfAlbums: [];
  isSearchResultsVisible: boolean;
}

interface FavouriteAlbumsState {
  favouriteAlbums: [];
}

interface PlayerState {
  trackURL: string;
  isPlaying: boolean;
}

interface AlbumDetailsState {
  isAlbumDetailsVisible: false;
  albumDetails: AlbumDetails;
}

export type GlobalState =
  | AuthorizationState
  | FetchState
  | SearchState
  | FavouriteAlbumsState
  | PlayerState
  | AlbumDetailsState;

export interface GlobalAction
  extends AuthorizationState,
    FetchState,
    SearchState,
    FavouriteAlbumsState,
    PlayerState,
    AlbumDetails,
    AlbumDetailsState {
  type: string;
}

export interface AlbumDetails {
  albumIMG: string;
  albumID: string;
  albumName: string;
  artistName: string;
  tracks: [];
  spotifyAlbumURL: string;
}

export interface Track {
  id: string;
  track_number: number;
  name: string;
  preview_url: string;
}
