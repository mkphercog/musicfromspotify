import React from "react";
import "./Album.scss";
import { AlbumDetails } from "../../../store/storeInterfaces";

export interface AlbumProps {
  album: AlbumDetails;
  dispatch: Function;
  showAlbumDetails: Function;
  setAlbumDetails: Function;
}

export const Album: React.SFC<AlbumProps> = ({
  album,
  dispatch,
  showAlbumDetails,
  setAlbumDetails,
}) => (
  <div className="albumssection__wrapper">
    <img src={album.albumIMG} alt="Album" className="albumssection__image" />

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
