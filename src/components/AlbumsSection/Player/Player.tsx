import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Player.scss";
import { GlobalStateSelector } from "../../../store/storeInterfaces";

import {
  setAndPlayCurrentTrack,
  stopMusic,
} from "../../../store/actions/PlayerActions";

export interface PlayerProps {
  tracks: {
    name: string;
    preview_url: string;
    track_number: number;
    artists: { name: string }[];
  }[];
}

export const Player: React.SFC<PlayerProps> = ({ tracks }) => {
  const dispatch = useDispatch();
  const tracksList = tracks;
  const currentTrack = useSelector(
    (state: GlobalStateSelector) => state.player.currentTrackURL
  );

  const play = () => {
    const findTrackNumber = tracks.findIndex(
      (track) => currentTrack === track.preview_url
    );
    if (findTrackNumber !== -1) {
      // dispatch(setAndPlayCurrentTrack(tracksList[findTrackNumber].preview_url));
    } else {
      // dispatch(setAndPlayCurrentTrack(tracksList[0].preview_url));
    }
    setTimeout(next, 30000);
  };

  const stop = () => {
    dispatch(stopMusic());
  };

  const next = () => {
    const findTrackNumber = tracks.findIndex(
      (track) => currentTrack === track.preview_url
    );

    if (findTrackNumber + 1 < tracks.length) {
      // dispatch(
      // setAndPlayCurrentTrack(tracksList[findTrackNumber + 1].preview_url)
      // );
    } else {
      // dispatch(setAndPlayCurrentTrack(tracksList[0].preview_url));
    }
  };

  const prev = () => {
    const findTrackNumber = tracks.findIndex(
      (track) => currentTrack === track.preview_url
    );
    if (findTrackNumber - 1 >= 0) {
      // dispatch(
      //   setAndPlayCurrentTrack(tracksList[findTrackNumber - 1].preview_url)
      // );
    } else {
      // dispatch(
      //   setAndPlayCurrentTrack(tracksList[tracks.length - 1].preview_url)
      // );
    }
  };

  const findTrackNumber = tracks.findIndex(
    (track) => currentTrack === track.preview_url
  );

  return (
    <div className="player">
      <p className="player__trackName">
        {findTrackNumber !== -1
          ? `${tracks[findTrackNumber].artists[0].name} - ${tracks[findTrackNumber].name}`
          : "--"}
      </p>
      <button className="player__controlers" onClick={prev}>
        <i className="fas fa-step-forward player__prev"></i>
      </button>
      <button className="player__controlers" onClick={stop}>
        <i className="fas fa-pause"></i>
      </button>
      <button className="player__controlers" onClick={play}>
        <i className="fas fa-play"></i>
      </button>
      <button className="player__controlers" onClick={next}>
        <i className="fas fa-step-forward"></i>
      </button>
    </div>
  );
};
