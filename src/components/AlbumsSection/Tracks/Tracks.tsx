import React from "react";
import "./Tracks.scss";
import { Track } from "../../../store/storeInterfaces";

export interface TracksProps {
  track: Track;
  isTrackPlaying: boolean;
  stopBtnClasses: string;
  trackClasses: string;
  dispatch: Function;
  stopMusic: Function;
  setAndPlayCurrentTrack: Function;
}

export const Tracks: React.SFC<TracksProps> = ({
  track,
  isTrackPlaying,
  stopBtnClasses,
  trackClasses,
  dispatch,
  stopMusic,
  setAndPlayCurrentTrack,
}) => (
  <div className="albumssection__trackWrapper">
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
          className="albumssection__detailsTrackButton"
          onClick={() => {
            dispatch(setAndPlayCurrentTrack(track.preview_url));
          }}
        >
          Play
        </button>
      )
    ) : (
      <button className="albumssection__detailsTrackButton" disabled>
        Play
      </button>
    )}

    <p className={trackClasses}>
      {track.track_number}. {track.name}
    </p>
  </div>
);
