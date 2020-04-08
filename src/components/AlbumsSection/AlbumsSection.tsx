import React from "react";
import "./AlbumsSection.scss";
import { AlbumDetails } from "./AlbumDetails/AlbumDetails";
import { Album } from "./Album/Album";
import { Tracks } from "./Tracks/Tracks";
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

export interface Album {
  albumIMG: string;
  albumID: string;
  albumName: string;
  artistName: string;
  tracks: any[];
  spotifyAlbumURL: string;
}

export interface Track {
  id: string;
  track_number: number;
  name: string;
  preview_url: string;
}

export const AlbumsSection: React.SFC = () => {
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
  const albumDetailsVisible = useSelector(
    (state: { albumDetails: { isAlbumDetailsVisible: boolean } }) =>
      state.albumDetails.isAlbumDetailsVisible
  );
  const dispatch = useDispatch();

  const albums = favouriteAlbums.map((album: Album) => {
    return (
      <Album
        key={album.albumID}
        album={album}
        dispatch={dispatch}
        showAlbumDetails={showAlbumDetails}
        setAlbumDetails={setAlbumDetails}
      />
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
      <Tracks
        key={track.id}
        track={track}
        answer={answer}
        classesBtn={classesBtn}
        classes={classes}
        dispatch={dispatch}
        stopMusic={stopMusic}
        setAndPlayCurrentTrack={setAndPlayCurrentTrack}
      />
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
        <AlbumDetails
          albumDetails={albumDetails}
          tracksListCurrentAlbum={tracksListCurrentAlbum}
          dispatch={dispatch}
          hideAlbumDetails={hideAlbumDetails}
          deleteAlbumFromList={deleteAlbumFromList}
        />
      ) : null}
    </section>
  );
};
