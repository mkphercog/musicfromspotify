import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Player.scss";
import { GlobalStateSelector } from "../../store/storeInterfaces";

import {
  stopMusic,
  playMusic,
  nextTrack,
} from "../../store/actions/PlayerActions";

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
  const player = useSelector((state: GlobalStateSelector) => state.player);
  const {
    currentTrackURL,
    currentTrackName,
    currentAlbumArtist,
    currentTrackNumber,
    tracksURLs,
    allTracksInAlbum,
  } = player;

  const play = () => {};

  const stop = () => {
    dispatch(stopMusic());
  };

  const next = () => {
    if (currentTrackNumber === allTracksInAlbum) {
      const name = tracks.filter((track) => track.track_number === 1);
      dispatch(nextTrack(name[0].name, tracksURLs[0], 1));
    } else {
      const name = tracks.filter(
        (track) => track.track_number === currentTrackNumber + 1
      );
      dispatch(
        nextTrack(
          name[0].name,
          tracksURLs[currentTrackNumber],
          currentTrackNumber + 1
        )
      );
    }
    dispatch(playMusic());
  };

  const prev = () => {
    if (currentTrackNumber === 1) {
      const name = tracks.filter(
        (track) => track.track_number === allTracksInAlbum
      );
      dispatch(
        nextTrack(
          name[0].name,
          tracksURLs[allTracksInAlbum - 1],
          allTracksInAlbum
        )
      );
    } else {
      const name = tracks.filter(
        (track) => track.track_number === currentTrackNumber - 1
      );
      dispatch(
        nextTrack(
          name[0].name,
          tracksURLs[currentTrackNumber - 2],
          currentTrackNumber - 1
        )
      );
    }
    dispatch(playMusic());
  };

  return (
    <div className="player">
      <p className="player__trackName">{`${currentAlbumArtist} - ${currentTrackName}`}</p>
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
