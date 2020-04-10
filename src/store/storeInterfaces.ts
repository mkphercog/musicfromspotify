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
  currentTrackName: string;
  currentTrackURL: string;
  isPlaying: boolean;
  currentTrackNumber: number;
  allTracksInAlbum: number;
  albumTracksURLs: [];
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

export interface GlobalStateSelector {
  authorization: AuthorizationState;
  fetchData: FetchState;
  searching: SearchState;
  favouriteAlbums: FavouriteAlbumsState;
  player: PlayerState;
  albumDetails: AlbumDetailsState;
}

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
