import React from "react";
import "./Album.scss";
import { AlbumDetails } from "../../../store/storeInterfaces";

export interface AlbumProps {
  album: AlbumDetails;
  dispatch: Function;
  showAlbumDetails: Function;
  setAlbumDetails: Function;
}

export const Album: React.FC<AlbumProps> = ({
  album,
  dispatch,
  showAlbumDetails,
  setAlbumDetails,
}) => (
  <div className="albums-section__wrapper">
    <img src={album.albumIMG} alt="Album" className="albums-section__image" />
    <div
      className="albums-section__hover-div"
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
            totalTracks: album.totalTracks,
          })
        );
      }}
    >
      <p className="albums-section__name-hover">{album.artistName}</p>
      <p className="albums-section__name-hover">{album.albumName}</p>
    </div>
  </div>
);
