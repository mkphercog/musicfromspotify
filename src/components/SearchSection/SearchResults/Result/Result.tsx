import React from "react";
import "./Result.scss";

export interface ResultProps {
  listOfAlbums: [];
}

interface Album {
  artists: [{ name: string }];
  name: string;
  id: string;
  images: [{ url: string }, { url: string }, { url: string }];
}

export const Result: React.SFC<ResultProps> = ({ listOfAlbums }) => {
  const albums = listOfAlbums.map((album: Album) => (
    <div key={album.id} className="searchsection__result">
      <p className="searchsection__description">{album.name}</p>
      <img src={album.images[2].url} alt="Album" />
      <p className="searchsection__description">{album.artists[0].name}</p>
      <button className="searchsection__addToFavourite">
        Dodaj do ulubionych
      </button>
    </div>
  ));
  return <>{albums}</>;
};
