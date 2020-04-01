import React from "react";
import { useSelector } from "react-redux";
import "./SearchResult.scss";
import { Result } from "./Result/Result";

export interface SearchResultProps {}

export const SearchResult: React.SFC<SearchResultProps> = () => {
  const listOfAlbums = useSelector(
    (state: { searching: { listOfAlbums: [] } }) => state.searching.listOfAlbums
  );

  return (
    <div className="searchsection___wrapper">
      {listOfAlbums.length ? (
        <Result listOfAlbums={listOfAlbums} />
      ) : (
        <p>Brak danych</p>
      )}
    </div>
  );
};
