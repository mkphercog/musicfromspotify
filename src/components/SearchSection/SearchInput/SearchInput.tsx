import React from "react";
import "./SearchInput.scss";

export interface SearchInputProps {
  value: string;
  setValue: Function;
  showResults: Function;
  dispatch: Function;
}

export const SearchInput: React.SFC<SearchInputProps> = ({
  value,
  setValue,
  showResults,
  dispatch,
}) => (
  <input
    className="searchsection__input"
    placeholder="Wyszukaj..."
    type="text"
    value={value}
    onClick={() => {
      dispatch(showResults());
    }}
    onChange={(e) => setValue(e.target.value)}
  />
);
