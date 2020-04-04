import React, { useState } from "react";
import "./AlbumsSection.scss";
import { useSelector, useDispatch } from "react-redux";
import { deleteAlbumFromList } from "../../store/actions/AddToFavouriteActions";

export interface AlbumsSectionProps {}

interface Album {
  albumIMG: string;
  albumID: string;
  albumName: string;
  artistName: string;
  tracks: any[];
  spotifyAlbumURL: string;
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
  const dispatch = useDispatch();
  const [idDetailsAlbumVisible, setDetailsAlbumVisible] = useState(false);
  const [albumDetails, setAlbumDetails] = useState<Album>({
    albumIMG: "",
    albumID: "",
    albumName: "",
    artistName: "",
    tracks: [],
    spotifyAlbumURL: "",
  });

  const albums = favouriteAlbums.map((album: Album) => {
    const tracksList = album.tracks.map((track: Track) => {
      const audioTrack = new Audio(track.preview_url);
      return (
        <div key={track.id}>
          <p>
            {track.track_number}. {track.name}
          </p>
          {track.preview_url === null ? null : (
            <>
              <button onClick={() => audioTrack.play()}>Play</button>
              <button onClick={() => audioTrack.pause()}>Pause</button>
            </>
          )}
        </div>
      );
    });
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
              albumID: album.albumID,
              albumName: album.albumName,
              artistName: album.artistName,
              tracks: tracksList,
              spotifyAlbumURL: album.spotifyAlbumURL,
            });
            setDetailsAlbumVisible(true);
          }}
        >
          <h1>{album.artistName}</h1>
          <h2>{album.albumName}</h2>
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
        {albumDetails.tracks}
        <a href={albumDetails.spotifyAlbumURL}>Pełny album znajdziesz tutaj</a>
        <button onClick={() => setDetailsAlbumVisible(false)}>X</button>
        <button
          onClick={() => {
            setDetailsAlbumVisible(false);
            dispatch(deleteAlbumFromList(albumDetails.albumID));
          }}
        >
          USUŃ ALBUM
        </button>
      </div>
    </section>
  );
};
