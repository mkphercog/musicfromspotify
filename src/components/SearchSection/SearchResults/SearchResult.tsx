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

export const SearchResult: React.FC<SearchResultProps> = ({
  listOfAlbums,
  hideSearchResults,
  dispatch,
  setInputValue,
  searchAlbums,
}) => (
  <div className="search-section___wrapper">
    <div className="search-section__results">
      {listOfAlbums.length ? (
        <Result listOfAlbums={listOfAlbums} />
      ) : (
        <p className="search-section__no-results">Brak wyników wyszukiwania</p>
      )}
    </div>
    <button
      className="search-section__close"
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
