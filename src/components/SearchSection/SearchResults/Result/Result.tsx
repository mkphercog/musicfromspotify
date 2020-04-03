import React from "react";
import "./Result.scss";
import { useSelector, useDispatch } from "react-redux";
import { addAlbumToFavourite } from "../../../../store/actions/AddToFavouriteActions";

export interface ResultProps {
  listOfAlbums: [];
}

interface Album {
  artists: [{ name: string }];
  name: string;
  id: string;
  images: { url: string }[];
  external_urls: { spotify: string };
}

export const Result: React.SFC<ResultProps> = ({ listOfAlbums }) => {
  const albumsFilter = listOfAlbums.filter(
    (album: { album_type: string }) => album.album_type === "album"
  );
  const accessToken = useSelector(
    (state: { authorization: { access_token: string } }) =>
      state.authorization.access_token
  );
  const dispatch = useDispatch();
  const favouriteAlbums = useSelector(
    (state: { favouriteAlbums: { favouriteAlbums: [] } }) =>
      state.favouriteAlbums.favouriteAlbums
  );

  const albums = albumsFilter.map((album: Album) => {
    const isDisabled = favouriteAlbums.find(
      (favouriteAlbum: { albumID: string }) => {
        if (album.id === favouriteAlbum.albumID) return true;
        return false;
      }
    );
    console.log(isDisabled);
    return (
      <div key={album.id} className="searchsection__result">
        <p className="searchsection__description">{album.name}</p>
        <img src={album.images[2].url} alt="Album" />
        <p className="searchsection__description">{album.artists[0].name}</p>
        <button
          className="searchsection__addToFavourite"
          disabled={isDisabled}
          onClick={() => {
            fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            })
              .then(res => {
                if (res.status === 200) {
                  return res.json();
                }
              })
              .then(res => {
                dispatch(
                  addAlbumToFavourite(
                    album.images[1].url,
                    album.id,
                    album.name,
                    album.artists[0].name,
                    res.items,
                    album.external_urls.spotify
                  )
                );
              });
          }}
        >
          Dodaj do ulubionych
        </button>
      </div>
    );
  });

  return <>{albums}</>;
};
