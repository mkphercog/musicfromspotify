import React from "react";
import "./SearchInput.scss";

export interface SearchInputProps {
  value: string;
  setValue: Function;
}

export const SearchInput: React.SFC<SearchInputProps> = ({
  value,
  setValue
}) => (
  <input
    className="searchsection__input"
    type="text"
    value={value}
    onChange={e => setValue(e.target.value)}
  />
);
