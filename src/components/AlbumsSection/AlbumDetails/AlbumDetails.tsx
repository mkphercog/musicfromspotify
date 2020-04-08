import React from "react";
import "./AlbumDetails.scss";

export interface AlbumDetailsProps {
  albumDetails: {
    albumIMG: string;
    artistName: string;
    albumName: string;
    spotifyAlbumURL: string;
    albumID: string;
  };
  tracksListCurrentAlbum: any[];
  dispatch: Function;
  hideAlbumDetails: Function;
  deleteAlbumFromList: Function;
}

export const AlbumDetails: React.SFC<AlbumDetailsProps> = ({
  albumDetails,
  tracksListCurrentAlbum,
  dispatch,
  hideAlbumDetails,
  deleteAlbumFromList,
}) => (
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
    <div className="albumssection__tracksWrapper">{tracksListCurrentAlbum}</div>
    <button
      className="albumssection__detailsClose"
      onClick={() => dispatch(hideAlbumDetails())}
    >
      <i className="fas fa-times"></i>
    </button>
  </div>
);
