import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Result.scss";

import { refreshAccessToken } from "../../../../authorization/config";
import { GlobalStateSelector } from "../../../../store/storeInterfaces";

import { addAlbumToFavourite } from "../../../../store/actions/AddToFavouriteActions";
import { setAccessTokens } from "../../../../store/actions/AuthorizationActions";
import {
  dataFetching,
  dataFetched,
  dataError,
} from "../../../../store/actions/FetchDataActions";

import { LoadingPage } from "../../../../pages/LoadingPage/LoadingPage";

interface ResultProps {
  listOfAlbums: [];
}

interface Album {
  artists: { name: string }[];
  name: string;
  id: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  total_tracks: number;
}

export const Result: React.SFC<ResultProps> = ({ listOfAlbums }) => {
  const isFetching = useSelector(
    (state: GlobalStateSelector) => state.fetchData.featching
  );
  const authorization = useSelector(
    (state: GlobalStateSelector) => state.authorization
  );
  const favouriteAlbums = useSelector(
    (state: GlobalStateSelector) => state.favouriteAlbums.favouriteAlbums
  );

  const { access_token, refresh_token } = authorization;
  const dispatch = useDispatch();

  const fetchAlbumToFavourite = (album: Album) => {
    fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        throw new Error();
      })
      .then((res) => {
        const albumObj = {
          albumIMG: album.images[1].url,
          albumID: album.id,
          albumName: album.name,
          artistName: album.artists[0].name,
          tracks: res.items,
          spotifyAlbumURL: album.external_urls.spotify,
          totalTracks: album.total_tracks,
        };
        dispatch(dataFetched());
        dispatch(addAlbumToFavourite(albumObj));
      })
      .catch((err) => {
        dispatch(dataError(err.message));
        refreshAccessToken(refresh_token, dispatch, setAccessTokens);
      });
  };

  const albumsFilter = listOfAlbums.filter(
    (album: { album_type: string }) => album.album_type === "album"
  );

  const albums = albumsFilter.map((album: Album) => {
    const isDisabledAddBtn = favouriteAlbums.find(
      (favouriteAlbum: { albumID: string }) =>
        album.id === favouriteAlbum.albumID
    );
    return (
      <div key={album.id} className="searchsection__result">
        <p className="searchsection__description">{album.name}</p>
        <img
          className="searchsection__albumImage"
          src={album.images[1].url}
          alt="Album"
        />
        <p className="searchsection__description">{album.artists[0].name}</p>
        <button
          className="searchsection__addToFavourite"
          disabled={isDisabledAddBtn}
          onClick={() => {
            dispatch(dataFetching());
            fetchAlbumToFavourite(album);
          }}
        >
          {isDisabledAddBtn ? "Dodano do ulubionych" : "Dodaj do ulubionych"}
        </button>
      </div>
    );
  });

  return (
    <>
      {isFetching ? <LoadingPage /> : null}
      {albums}
    </>
  );
};
