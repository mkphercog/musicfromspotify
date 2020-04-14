import React from "react";
import "./AlbumDetails.scss";
import { Tracks } from "./Tracks/Tracks";
import {
  setCurrentTrack,
  stopMusic,
} from "../../../store/actions/PlayerActions";
import {
  Track,
  AlbumDetails as AlbumDetailsInterface,
} from "../../../store/storeInterfaces";
import { Player } from "../../Player/Player";

export interface AlbumDetailsProps {
  albumDetails: AlbumDetailsInterface;
  isPlaying: boolean;
  currentTrack: string;
  dispatch: Function;
  hideAlbumDetails: Function;
  deleteAlbumFromList: Function;
}

export const AlbumDetails: React.FC<AlbumDetailsProps> = ({
  albumDetails,
  isPlaying,
  currentTrack,
  dispatch,
  hideAlbumDetails,
  deleteAlbumFromList,
}) => {
  const tracksListCurrentAlbum = albumDetails.tracks.map((track: Track) => {
    const isTrackPlaying = isPlaying && currentTrack === track.preview_url;
    const trackClasses = isTrackPlaying
      ? "albumssection__detailsTrackName albumssection__detailsTrackName--green"
      : "albumssection__detailsTrackName";
    const stopBtnClasses = isTrackPlaying
      ? "albumssection__detailsTrackButton albumssection__detailsTrackButton--green"
      : "albumssection__detailsTrackButton";
    return (
      <>
        <Tracks
          key={track.id}
          track={track}
          isTrackPlaying={isTrackPlaying}
          stopBtnClasses={stopBtnClasses}
          trackClasses={trackClasses}
          dispatch={dispatch}
          stopMusic={stopMusic}
          setCurrentTrack={setCurrentTrack}
          albumDetails={albumDetails}
        />
        {/* <Player/> */}
      </>
    );
  });

  return (
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
  );
};
