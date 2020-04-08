import React from "react";
import "./Tracks.scss";
import { Track } from "../AlbumsSection";

export interface TracksProps {
  track: Track;
  answer: boolean;
  classesBtn: string;
  classes: string;
  dispatch: Function;
  stopMusic: Function;
  setAndPlayCurrentTrack: Function;
}

export const Tracks: React.SFC<TracksProps> = ({
  track,
  answer,
  classesBtn,
  classes,
  dispatch,
  stopMusic,
  setAndPlayCurrentTrack,
}) => (
  <div className="albumssection__trackWrapper">
    {track.preview_url ? (
      answer ? (
        <button
          className={classesBtn}
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

    <p className={classes}>
      {track.track_number}. {track.name}
    </p>
  </div>
);
