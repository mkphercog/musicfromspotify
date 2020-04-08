import React from "react";
import "./SearchButton.scss";

export interface SearchButtonProps {}

export const SearchButton: React.SFC<SearchButtonProps> = () => {
  return (
    <button className="searchsection__searchbtn">
      <i className="fas fa-search"></i>
    </button>
  );
};
