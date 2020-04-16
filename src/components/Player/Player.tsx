import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Player.scss";
import { GlobalStateSelector } from "../../store/storeInterfaces";

import {
  playMusic,
  nextTrack,
  pauseMusic,
  stopMusic,
} from "../../store/actions/PlayerActions";

export interface PlayerProps {
  tracks: {
    name: string;
    preview_url: string;
    track_number: number;
    artists: { name: string }[];
  }[];
}

export const Player: React.FC<PlayerProps> = ({ tracks }) => {
  const dispatch = useDispatch();
  const player = useSelector((state: GlobalStateSelector) => state.player);
  const {
    currentTrackURL,
    currentTrackName,
    currentAlbumArtist,
    currentTrackNumber,
    allTracksInAlbum,
    isPlaying,
    trackCurrentTime,
  } = player;

  useEffect(() => {
    let idInterval: NodeJS.Timeout;
    if (isPlaying) {
      idInterval = setInterval(() => {
        dispatch(pauseMusic());
        next();
      }, 30000 - trackCurrentTime * 1000);
    }

    return () => clearInterval(idInterval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, currentTrackURL]);

  const play = () => {
    dispatch(playMusic());
  };

  const pause = () => {
    dispatch(pauseMusic());
  };

  const stop = () => {
    dispatch(stopMusic());
  };

  const next = () => {
    if (currentTrackNumber === allTracksInAlbum) {
      const getTrack = tracks.filter((track) => track.track_number === 1);
      dispatch(nextTrack(getTrack[0].name, getTrack[0].preview_url, 1));
    } else {
      const getTrack = tracks.filter(
        (track) => track.track_number === currentTrackNumber + 1
      );
      dispatch(
        nextTrack(
          getTrack[0].name,
          getTrack[0].preview_url,
          getTrack[0].track_number
        )
      );
    }
    dispatch(playMusic());
  };

  const prev = () => {
    if (currentTrackNumber === 1) {
      const getTrack = tracks.filter(
        (track) => track.track_number === allTracksInAlbum
      );
      dispatch(
        nextTrack(getTrack[0].name, getTrack[0].preview_url, allTracksInAlbum)
      );
    } else {
      const getTrack = tracks.filter(
        (track) => track.track_number === currentTrackNumber - 1
      );
      dispatch(
        nextTrack(
          getTrack[0].name,
          getTrack[0].preview_url,
          currentTrackNumber - 1
        )
      );
    }
    dispatch(playMusic());
  };

  return (
    <div className="player">
      <p className="player__track-name">{`${
        currentTrackNumber ? currentTrackNumber : ""
      }. ${currentAlbumArtist} - ${currentTrackName}`}</p>

      <div className="player__btn-wrapper">
        <button className="player__controlers" onClick={prev}>
          <i className="fas fa-step-forward player__prev"></i>
        </button>
        <button className="player__controlers" onClick={stop}>
          <i className="fas fa-stop"></i>
        </button>
        {isPlaying ? (
          <button className="player__controlers" onClick={pause}>
            <i className="fas fa-pause"></i>
          </button>
        ) : (
          <button className="player__controlers" onClick={play}>
            <i className="fas fa-play"></i>
          </button>
        )}
        <button className="player__controlers" onClick={next}>
          <i className="fas fa-step-forward"></i>
        </button>
      </div>
    </div>
  );
};
