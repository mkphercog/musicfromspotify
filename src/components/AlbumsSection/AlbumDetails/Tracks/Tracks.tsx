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
          Stop
        </button>
      ) : (
        <button
          className="albums-section__details-track-button"
          onClick={() => {
            console.log(track);
            dispatch(setCurrentTrack(track, albumDetails));
            dispatch(playMusic());
          }}
        >
          Play
        </button>
      )
    ) : (
      <button className="albums-section__details-track-button" disabled>
        Play
      </button>
    )}

    <p className={trackClasses}>
      {track.track_number}. {track.name}
    </p>
  </div>
);
