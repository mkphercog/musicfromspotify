import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SearchSection.scss";
import {
  searchAlbums,
  showSearchResults,
} from "../../store/actions/SearchingActions";
import { SearchInput } from "./SearchInput/SearchInput";
import { SearchButton } from "./SearchButton/SearchButton";
import { SearchResult } from "./SearchResults/SearchResult";
import { refreshAccessToken } from "../../authorization/config";
import { setAccessTokens } from "../../store/actions/AuthorizationActions";
import {
  dataFetching,
  dataFetched,
  dataError,
} from "../../store/actions/FetchDataActions";
import { LoadingPage } from "../../pages/LoadingPage/LoadingPage";

export interface SearchSectionProps {}

export const SearchSection: React.SFC<SearchSectionProps> = () => {
  const isFetching = useSelector(
    (state: { fetchData: { featching: boolean } }) => state.fetchData.featching
  );
  const isAlbumDetailsVisible = useSelector(
    (state: { searching: { isAlbumDetailsVisible: boolean } }) =>
      state.searching.isAlbumDetailsVisible
  );
  const [value, setValue] = useState("");
  const accessToken = useSelector(
    (state: { authorization: { access_token: string } }) =>
      state.authorization.access_token
  );
  const dispatch = useDispatch();
  const refresh_token = useSelector(
    (state: { authorization: { refresh_token: string } }) =>
      state.authorization.refresh_token
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value !== "") {
      dispatch(dataFetching());
      fetch(`https://api.spotify.com/v1/search?q=${value}&type=album`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((res: Response) => {
          if (res.status === 200) return res.json();
          throw new Error();
        })
        .then((res) => {
          dispatch(dataFetched());
          dispatch(searchAlbums(res.albums.items));
        })
        .catch((err) => {
          dispatch(dataError(err.message));
          refreshAccessToken(
            refresh_token,
            dispatch,
            setAccessTokens,
            searchAlbums
          );
        });
    } else {
      dispatch(searchAlbums([]));
    }
  };

  return (
    <section className="searchsection">
      {isFetching ? <LoadingPage /> : null}
      <form
        className="searchsection__form"
        onSubmit={(e) => {
          dispatch(showSearchResults());
          handleSubmit(e);
        }}
      >
        <div className="relative">
          <SearchInput
            value={value}
            setValue={setValue}
            showResults={showSearchResults}
            dispatch={dispatch}
          />
          <SearchButton />
        </div>
      </form>
      <div className="searchsection__resultsPosition">
        {isAlbumDetailsVisible ? <SearchResult /> : null}
      </div>
    </section>
  );
};
