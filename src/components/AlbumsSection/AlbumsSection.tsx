import React from "react";
import "./AlbumsSection.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteAlbumFromList } from "../../store/actions/AddToFavouriteActions";
import {
  setAndPlayCurrentTrack,
  stopMusic,
} from "../../store/actions/PlayerActions";
import {
  hideAlbumDetails,
  showAlbumDetails,
  setAlbumDetails,
} from "../../store/actions/AlbumDetailsActions";

export interface AlbumsSectionProps {}

interface Album {
  albumIMG: string;
  albumID: string;
  albumName: string;
  artistName: string;
  tracks: any[];
  spotifyAlbumURL: string;
}

interface Track {
  id: string;
  track_number: number;
  name: string;
  preview_url: string;
}

export const AlbumsSection: React.SFC<AlbumsSectionProps> = () => {
  const favouriteAlbums = useSelector(
    (state: { favouriteAlbums: { favouriteAlbums: [] } }) =>
      state.favouriteAlbums.favouriteAlbums
  );
  const currentTrack = useSelector(
    (state: { player: { trackURL: string } }) => state.player.trackURL
  );
  const isPlaying = useSelector(
    (state: { player: { isPlaying: boolean } }) => state.player.isPlaying
  );
  const albumDetails = useSelector(
    (state: { albumDetails: { albumDetails: Album } }) =>
      state.albumDetails.albumDetails
  );
  const dispatch = useDispatch();

  const albumDetailsVisible = useSelector(
    (state: { albumDetails: { isAlbumDetailsVisible: boolean } }) =>
      state.albumDetails.isAlbumDetailsVisible
  );
  // if (isPlaying) {
  //   setTimeout(() => dispatch(stopMusic()), 29000);
  // }

  const albums = favouriteAlbums.map((album: Album) => {
    return (
      <div key={album.albumID} className="albumssection__wrapper">
        <img
          src={album.albumIMG}
          alt="Album"
          className="albumssection__image"
        />

        <div
          className="albumssection__hoverDiv"
          onClick={() => {
            const obj = {
              albumIMG: album.albumIMG,
              albumID: album.albumID,
              albumName: album.albumName,
              artistName: album.artistName,
              tracks: album.tracks,
              spotifyAlbumURL: album.spotifyAlbumURL,
            };
            dispatch(showAlbumDetails());
            dispatch(setAlbumDetails(obj));
          }}
        >
          <h1>{album.artistName}</h1>
          <h2>{album.albumName}</h2>
        </div>
      </div>
    );
  });

  const tracksListCurrentAlbum = albumDetails.tracks.map((track: Track) => {
    const answer =
      isPlaying && currentTrack === track.preview_url ? true : false;
    const classes = answer
      ? "albumssection__detailsTrackName albumssection__detailsTrackName--green"
      : "albumssection__detailsTrackName";
    const classesBtn = answer
      ? "albumssection__detailsTrackButton albumssection__detailsTrackButton--green"
      : "albumssection__detailsTrackButton";
    return (
      <div className="albumssection__trackWrapper" key={track.id}>
        {track.preview_url ? (
          answer ? (
            <button
              className={classesBtn}
              onClick={() => {
                dispatch(stopMusic());
              }}
            >
              Stop
            </button>
          ) : (
            <button
              className="albumssection__detailsTrackButton"
              onClick={() => {
                dispatch(setAndPlayCurrentTrack(track.preview_url));
              }}
            >
              Play
            </button>
          )
        ) : null}

        <p className={classes}>
          {track.track_number}. {track.name}
        </p>
      </div>
    );
  });

  return (
    <section className="albumssection">
      {albums.length ? (
        albums.reverse()
      ) : (
        <div className="albumssection__wrapper">Brak danych</div>
      )}

      {albumDetailsVisible ? (
        <div className="albumssection__detailsAlbum">
          <div className="albumssection__albumInfoWrapper">
            <img
              className="albumssection__detailsImage"
              src={albumDetails.albumIMG}
              alt="Album"
            />
            <h1 className="albumssection__detailsArtistName">
              {albumDetails.artistName}
            </h1>
            <h2 className="albumssection__detailsAlbumName">
              {albumDetails.albumName}
            </h2>
            <a
              className="albumssection__detailsFullAlbumSpotify"
              href={albumDetails.spotifyAlbumURL}
            >
              Pełny album znajdziesz tutaj
            </a>
            <button
              className="albumssection__detailsDeleteAlbum"
              onClick={() => {
                dispatch(hideAlbumDetails());
                dispatch(deleteAlbumFromList(albumDetails.albumID));
              }}
            >
              Usuń album z ulubionych
            </button>
          </div>
          <div className="albumssection__tracksWrapper">
            {tracksListCurrentAlbum}
          </div>
          <button
            className="albumssection__detailsClose"
            onClick={() => dispatch(hideAlbumDetails())}
          >
            X
          </button>
        </div>
      ) : null}
    </section>
  );
};
