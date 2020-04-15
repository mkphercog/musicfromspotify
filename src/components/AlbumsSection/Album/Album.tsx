import React from "react";
import "./Album.scss";
import { AlbumDetails } from "../../../store/storeInterfaces";

export interface AlbumProps {
  album: AlbumDetails;
  dispatch: Function;
  showAlbumDetails: Function;
  setAlbumDetails: Function;
  tracksNowPlaying: [];
}

export const Album: React.FC<AlbumProps> = ({
  album,
  dispatch,
  showAlbumDetails,
  setAlbumDetails,
  tracksNowPlaying,
}) => (
  <div className="albums-section__wrapper">
    <img src={album.albumIMG} alt="Album" className="albums-section__image" />
    {album.tracks === tracksNowPlaying ? (
      <i className="fab fa-itunes-note albums-section__note"></i>
    ) : null}

    <div
      className="albums-section__hover-div"
      onClick={() => {
        dispatch(
          setAlbumDetails({
            albumIMG: album.albumIMG,
            albumID: album.albumID,
            albumName: album.albumName,
            artistName: album.artistName,
            tracks: album.tracks,
            spotifyAlbumURL: album.spotifyAlbumURL,
            totalTracks: album.totalTracks,
          })
        );
        dispatch(showAlbumDetails());
      }}
    >
      <p className="albums-section__name-hover">{album.artistName}</p>
      <p className="albums-section__name-hover">{album.albumName}</p>
    </div>
  </div>
);
