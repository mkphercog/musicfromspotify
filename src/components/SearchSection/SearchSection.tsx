import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refreshAccessToken } from "../../authorization/config";
import "./SearchSection.scss";
import { SearchInput } from "./SearchInput/SearchInput";
import { SearchButton } from "./SearchButton/SearchButton";
import { SearchResult } from "./SearchResults/SearchResult";
import { LoadingPage } from "../../pages/LoadingPage/LoadingPage";
import { GlobalAction } from "../../store/storeInterfaces";
import { setAccessTokens } from "../../store/actions/AuthorizationActions";
import {
  searchAlbums,
  showSearchResults,
} from "../../store/actions/SearchingActions";
import {
  dataFetching,
  dataFetched,
  dataError,
} from "../../store/actions/FetchDataActions";

export interface SearchSectionProps {}

export const SearchSection: React.SFC<SearchSectionProps> = () => {
  const isFetching = useSelector(
    (state: { fetchData: GlobalAction }) => state.fetchData.featching
  );
  const isSearchResultsVisible = useSelector(
    (state: { searching: GlobalAction }) =>
      state.searching.isSearchResultsVisible
  );
  const accessToken = useSelector(
    (state: { authorization: GlobalAction }) => state.authorization.access_token
  );
  const refresh_token = useSelector(
    (state: { authorization: GlobalAction }) =>
      state.authorization.refresh_token
  );
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputValue !== "") {
      dispatch(dataFetching());
      fetch(`https://api.spotify.com/v1/search?q=${inputValue}&type=album`, {
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
            value={inputValue}
            setValue={setInputValue}
            showResults={showSearchResults}
            dispatch={dispatch}
          />
          <SearchButton />
        </div>
      </form>
      <div className="searchsection__resultsPosition">
        {isSearchResultsVisible ? <SearchResult /> : null}
      </div>
    </section>
  );
};
