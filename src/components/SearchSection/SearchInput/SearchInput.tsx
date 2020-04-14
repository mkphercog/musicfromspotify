import React from "react";
import "./SearchInput.scss";

export interface SearchInputProps {
  inputValue: string;
  setInputValue: Function;
  isSearchResultsVisible: boolean;
  showResults: Function;
  dispatch: Function;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  inputValue,
  setInputValue,
  isSearchResultsVisible,
  showResults,
  dispatch,
}) => (
  <input
    className="search-section__input"
    placeholder="Wyszukaj album / artystę..."
    type="text"
    value={inputValue}
    onClick={() => {
      if (!isSearchResultsVisible) dispatch(showResults());
    }}
    onChange={(e) => setInputValue(e.target.value)}
  />
);
