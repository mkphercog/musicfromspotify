import React from "react";
import "./Tracks.scss";
import { Track, AlbumDetails } from "../../../../store/storeInterfaces";
import { playMusic } from "../../../../store/actions/PlayerActions";

export interface TracksProps {
  track: Track;
  isTrackPlaying: boolean;
  stopBtnClasses: string;
  trackClasses: string;
  dispatch: Function;
  stopMusic: Function;
  setCurrentTrack: Function;
  albumDetails: AlbumDetails;
}

export const Tracks: React.FC<TracksProps> = ({
  track,
  isTrackPlaying,
  stopBtnClasses,
  trackClasses,
  dispatch,
  stopMusic,
  setCurrentTrack,
  albumDetails,
}) => (
  <div className="albums-section__track-wrapper">
    {track.preview_url ? (
      isTrackPlaying ? (
        <button
          className={stopBtnClasses}
          onClick={() => {
            dispatch(stopMusic());
          }}
        >
          <i className="fas fa-stop"></i>
        </button>
      ) : (
        <button
          className="albums-section__details-track-button"
          onClick={() => {
            dispatch(setCurrentTrack(track, albumDetails));
            dispatch(playMusic());
          }}
        >
          <i className="fas fa-play"></i>
        </button>
      )
    ) : (
      <button className="albums-section__details-track-button" disabled>
        <i className="fas fa-play"></i>
      </button>
    )}

    <p className={trackClasses}>
      {track.track_number}. {track.name}
    </p>
  </div>
);
