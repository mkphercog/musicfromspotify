import React, { useState } from "react";
import "./AlbumsSection.scss";
import { useSelector } from "react-redux";

export interface AlbumsSectionProps {}

interface Album {
  albumIMG: string;
  albumID: string;
  albumName: string;
  artistName: string;
  tracks: any[];
}

interface Track {
  id: string;
  track_number: number;
  name: string;
  preview_url: string;
}

export const AlbumsSection: React.SFC<AlbumsSectionProps> = () => {
  const favouriteAlbums = useSelector(
    (state: { favouriteAlbums: { favouriteAlbums: [] } }) =>
      state.favouriteAlbums.favouriteAlbums
  );
  const [idDetailsAlbumVisible, setDetailsAlbumVisible] = useState(false);
  const [albumDetails, setAlbumDetails] = useState<Album>({
    albumIMG: "",
    albumID: "",
    albumName: "",
    artistName: "",
    tracks: []
  });

  const albums = favouriteAlbums.map((album: Album) => {
    const tracksList = album.tracks.map((track: Track) => (
      <div key={track.id}>
        <p>
          {track.track_number}. {track.name}
        </p>
        <a href={track.preview_url}> {`>Posłuchaj<`} </a>
      </div>
    ));
    return (
      <div key={album.albumID} className="albumssection__wrapper">
        <img
          src={album.albumIMG}
          alt="Album"
          className="albumssection__image"
        />

        <div
          className="albumssection__hoverDiv"
          onClick={() => {
            setAlbumDetails({
              albumIMG: album.albumIMG,
              albumID: "",
              albumName: album.albumName,
              artistName: album.artistName,
              tracks: tracksList
            });
            setDetailsAlbumVisible(!idDetailsAlbumVisible);
          }}
        >
          <h1>{album.artistName}</h1>
          <h2>{album.albumName}</h2>
          <p>Zobacz szczegóły</p>
        </div>
      </div>
    );
  });
  return (
    <section className="albumssection">
      {albums.reverse()}
      <div
        style={{ display: `${idDetailsAlbumVisible ? "block" : "none"}` }}
        className="albumssection__detailsAlbum"
      >
        <h1>{albumDetails.albumName}</h1>
        {/* <div> */}
        {albumDetails.tracks}
        {/* </div> */}
      </div>
    </section>
  );
};
