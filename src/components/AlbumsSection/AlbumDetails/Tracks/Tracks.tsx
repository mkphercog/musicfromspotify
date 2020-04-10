import React from "react";
import "./Tracks.scss";
import { Track } from "../../../../store/storeInterfaces";

export interface TracksProps {
  track: Track;
  isTrackPlaying: boolean;
  stopBtnClasses: string;
  trackClasses: string;
  dispatch: Function;
  stopMusic: Function;
  setAndPlayCurrentTrack: Function;
  allTracksInAlbum: number;
}

export const Tracks: React.SFC<TracksProps> = ({
  track,
  isTrackPlaying,
  stopBtnClasses,
  trackClasses,
  dispatch,
  stopMusic,
  setAndPlayCurrentTrack,
  allTracksInAlbum,
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
            console.log(track);
            dispatch(setAndPlayCurrentTrack(track, allTracksInAlbum));
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
