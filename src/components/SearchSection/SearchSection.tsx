import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SearchSection.scss";
import { searchAlbums } from "../../store/actions/SearchingActions";
import { SearchInput } from "./SearchInput/SearchInput";
import { SearchButton } from "./SearchButton/SearchButton";
import { SearchResult } from "./SearchResults/SearchResult";

export interface SearchSectionProps {}

export const SearchSection: React.SFC<SearchSectionProps> = () => {
  const [value, setValue] = useState("");
  const accessToken = useSelector(
    (state: { authorization: { access_token: string } }) =>
      state.authorization.access_token
  );
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value !== "") {
      fetch(`https://api.spotify.com/v1/search?q=${value}&type=album`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
        .then((res: Response) => {
          if (res.status === 200) return res.json();
          throw new Error();
        })
        .then(res => dispatch(searchAlbums(res.albums.items)))
        .catch(err => {
          console.log(err);
          dispatch(searchAlbums([]));
        });
    } else {
      alert("Pusty!");
    }
  };

  return (
    <section className="searchsection">
      <h1 className="searchsection__title">Wyszukiwarka</h1>
      <form className="searchsection__form" onSubmit={e => handleSubmit(e)}>
        <SearchInput value={value} setValue={setValue} />
        <SearchButton />
      </form>
      <SearchResult />
    </section>
  );
};
