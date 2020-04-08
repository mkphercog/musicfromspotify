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
            dispatch(showAlbumDetails());
            dispatch(
              setAlbumDetails({
                albumIMG: album.albumIMG,
                albumID: album.albumID,
                albumName: album.albumName,
                artistName: album.artistName,
                tracks: album.tracks,
                spotifyAlbumURL: album.spotifyAlbumURL,
              })
            );
          }}
        >
          <p className="albumssection__nameHover">{album.artistName}</p>
          <p className="albumssection__nameHover">{album.albumName}</p>
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
        ) : (
          <button className="albumssection__detailsTrackButton" disabled>
            Play
          </button>
        )}

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
        <div className="albumssection__noResults">
          <p>Brak danych</p>
        </div>
      )}

      {albumDetailsVisible ? (
        <div className="albumssection__detailsAlbum">
          <div className="albumssection__albumInfoWrapper">
            <img
              className="albumssection__detailsImage"
              src={albumDetails.albumIMG}
              alt="Album"
            />
            <div className="albumssection__detailsNameWrapper">
              <h1 className="albumssection__detailsArtistName">
                {albumDetails.artistName}
              </h1>
              <h2 className="albumssection__detailsAlbumName">
                {albumDetails.albumName}
              </h2>
            </div>
            <div className="albumssection__detailsButtonsWrapper">
              <a
                className="albumssection__detailsFullAlbumSpotify"
                href={albumDetails.spotifyAlbumURL}
                target="_blank"
                rel="noopener noreferrer"
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
          </div>
          <div className="albumssection__tracksWrapper">
            {tracksListCurrentAlbum}
          </div>
          <button
            className="albumssection__detailsClose"
            onClick={() => dispatch(hideAlbumDetails())}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      ) : null}
    </section>
  );
};
