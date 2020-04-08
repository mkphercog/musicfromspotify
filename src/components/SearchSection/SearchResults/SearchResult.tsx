import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SearchResult.scss";
import { Result } from "./Result/Result";
import { hideSearchResults } from "../../../store/actions/SearchingActions";

export interface SearchResultProps {}

export const SearchResult: React.SFC<SearchResultProps> = () => {
  const listOfAlbums = useSelector(
    (state: { searching: { listOfAlbums: [] } }) => state.searching.listOfAlbums
  );
  const dispatch = useDispatch();

  return (
    <div className="searchsection___wrapper">
      <div className="searchsection__results">
        {listOfAlbums.length ? (
          <Result listOfAlbums={listOfAlbums} />
        ) : (
          <p className="searchsection__noResults">Brak danych</p>
        )}
      </div>
      <button
        className="searchsection__close"
        onClick={() => dispatch(hideSearchResults())}
      >
        Zamknij wyszukiwarkę
      </button>
    </div>
  );
};
