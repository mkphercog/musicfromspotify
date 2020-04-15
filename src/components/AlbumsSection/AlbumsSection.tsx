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
  const { currentTrackURL, isPlaying, tracks } = player;
  const dispatch = useDispatch();

  const renderAlbums = favouriteAlbums.map((album: AlbumDetailsInterface) => (
    <Album
      key={album.albumID}
      album={album}
      dispatch={dispatch}
      showAlbumDetails={showAlbumDetails}
      setAlbumDetails={setAlbumDetails}
      tracksNowPlaying={tracks}
    />
  ));

  return (
    <section className="albums-section">
      {renderAlbums.length ? (
        renderAlbums.reverse()
      ) : (
        <div className="albums-section__no-results">
          <p className="albums-section__no-result-name">Brak albumów</p>
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
      {isPlaying || currentTrackURL ? <Player tracks={tracks} /> : null}
    </section>
  );
};
