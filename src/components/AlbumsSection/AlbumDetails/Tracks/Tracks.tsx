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

export const Tracks: React.SFC<TracksProps> = ({
  track,
  isTrackPlaying,
  stopBtnClasses,
  trackClasses,
  dispatch,
  stopMusic,
  setCurrentTrack,
  albumDetails,
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
            dispatch(setCurrentTrack(track, albumDetails));
            dispatch(playMusic());
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
