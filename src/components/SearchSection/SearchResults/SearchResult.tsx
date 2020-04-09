import React from "react";
import "./SearchResult.scss";
import { Result } from "./Result/Result";

interface SearchResultProps {
  listOfAlbums: [];
  hideSearchResults: Function;
  dispatch: Function;
  setInputValue: Function;
  searchAlbums: Function;
}

export const SearchResult: React.SFC<SearchResultProps> = ({
  listOfAlbums,
  hideSearchResults,
  dispatch,
  setInputValue,
  searchAlbums,
}) => (
  <div className="searchsection___wrapper">
    <div className="searchsection__results">
      {listOfAlbums.length ? (
        <Result listOfAlbums={listOfAlbums} />
      ) : (
        <p className="searchsection__noResults">Brak wyników wyszukiwania</p>
      )}
    </div>
    <button
      className="searchsection__close"
      onClick={() => {
        dispatch(hideSearchResults());
        setInputValue("");
        dispatch(searchAlbums([]));
      }}
    >
      Zamknij wyszukiwarkę
    </button>
  </div>
);
