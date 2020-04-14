import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./AlbumsSection.scss";

import { AlbumDetails } from "./AlbumDetails/AlbumDetails";
import { Album } from "./Album/Album";
import { Player } from "../Player/Player";

import {
  AlbumDetails as AlbumDetailsInterface,
  GlobalStateSelector,
} from "../../store/storeInterfaces";

import { deleteAlbumFromList } from "../../store/actions/AddToFavouriteActions";
import {
  hideAlbumDetails,
  showAlbumDetails,
  setAlbumDetails,
} from "../../store/actions/AlbumDetailsActions";

export const AlbumsSection: React.FC = () => {
  const favouriteAlbums = useSelector(
    (state: GlobalStateSelector) => state.favouriteAlbums.favouriteAlbums
  );
  const player = useSelector((state: GlobalStateSelector) => state.player);
  const detailsAlbum = useSelector(
    (state: GlobalStateSelector) => state.albumDetails
  );

  const { albumDetails, isAlbumDetailsVisible } = detailsAlbum;
  const { currentTrackURL, isPlaying } = player;
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

      {isAlbumDetailsVisible ? (
        <AlbumDetails
          albumDetails={albumDetails}
          isPlaying={isPlaying}
          currentTrack={currentTrackURL}
          dispatch={dispatch}
          hideAlbumDetails={hideAlbumDetails}
          deleteAlbumFromList={deleteAlbumFromList}
        />
      ) : null}
      <Player tracks={albumDetails.tracks} />
    </section>
  );
};
