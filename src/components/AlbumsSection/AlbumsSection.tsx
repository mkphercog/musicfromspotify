import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AlbumsSection.scss";

import { AlbumDetails } from "./AlbumDetails/AlbumDetails";
import { Album } from "./Album/Album";

import {
  GlobalAction,
  AlbumDetails as AlbumDetailsInterface,
} from "../../store/storeInterfaces";

import { deleteAlbumFromList } from "../../store/actions/AddToFavouriteActions";
import {
  hideAlbumDetails,
  showAlbumDetails,
  setAlbumDetails,
} from "../../store/actions/AlbumDetailsActions";

export const AlbumsSection: React.SFC = () => {
  const favouriteAlbums = useSelector(
    (state: { favouriteAlbums: GlobalAction }) =>
      state.favouriteAlbums.favouriteAlbums
  );
  const currentTrack = useSelector(
    (state: { player: GlobalAction }) => state.player.trackURL
  );
  const isPlaying = useSelector(
    (state: { player: GlobalAction }) => state.player.isPlaying
  );
  const albumDetails = useSelector(
    (state: { albumDetails: GlobalAction }) => state.albumDetails.albumDetails
  );
  const albumDetailsVisible = useSelector(
    (state: { albumDetails: GlobalAction }) =>
      state.albumDetails.isAlbumDetailsVisible
  );
  const dispatch = useDispatch();

  const albums = favouriteAlbums.map((album: AlbumDetailsInterface) => (
    <Album
      key={album.albumID}
      album={album}
      dispatch={dispatch}
      showAlbumDetails={showAlbumDetails}
      setAlbumDetails={setAlbumDetails}
    />
  ));

  return (
    <section className="albumssection">
      {albums.length ? (
        albums.reverse()
      ) : (
        <div className="albumssection__noResults">
          <p className="albumssection__noResultName">Brak albumów</p>
        </div>
      )}

      {albumDetailsVisible ? (
        <AlbumDetails
          albumDetails={albumDetails}
          isPlaying={isPlaying}
          currentTrack={currentTrack}
          dispatch={dispatch}
          hideAlbumDetails={hideAlbumDetails}
          deleteAlbumFromList={deleteAlbumFromList}
        />
      ) : null}
    </section>
  );
};
