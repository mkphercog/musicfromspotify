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
      ? "albums-section__details-track-name albums-section__details-track-name--green"
      : "albums-section__details-track-name";
    const stopBtnClasses = isTrackPlaying
      ? "albums-section__details-track-button albums-section__details-track-button--green"
      : "albums-section__details-track-button";
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
    <div className="albums-section__details-album">
      <div className="albums-section__album-info-wrapper">
        <img
          className="albums-section__details-image"
          src={albumDetails.albumIMG}
          alt="Album"
        />
        <div className="albums-section__details-name-wrapper">
          <h1 className="albums-section__details-artist-name">
            {albumDetails.artistName}
          </h1>
          <h2 className="albums-section__details-album-name">
            {albumDetails.albumName}
          </h2>
        </div>
        <div className="albums-section__details-buttons-wrapper">
          <a
            className="albums-section__details-full-album-spotify"
            href={albumDetails.spotifyAlbumURL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pełny album znajdziesz tutaj
          </a>
          <button
            className="albums-section__details-delete-album"
            onClick={() => {
              dispatch(hideAlbumDetails());
              dispatch(deleteAlbumFromList(albumDetails.albumID));
            }}
          >
            Usuń album z ulubionych
          </button>
        </div>
      </div>
      <div className="albums-section__tracks-wrapper">
        {tracksListCurrentAlbum}
      </div>
      <button
        className="albums-section__details-close"
        onClick={() => dispatch(hideAlbumDetails())}
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};
