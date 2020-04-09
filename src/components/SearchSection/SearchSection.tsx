import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SearchSection.scss";

import { refreshAccessToken } from "../../authorization/config";
import { GlobalAction } from "../../store/storeInterfaces";

import { SearchInput } from "./SearchInput/SearchInput";
import { SearchButton } from "./SearchButton/SearchButton";
import { SearchResult } from "./SearchResults/SearchResult";
import { LoadingPage } from "../../pages/LoadingPage/LoadingPage";

import { setAccessTokens } from "../../store/actions/AuthorizationActions";
import {
  searchAlbums,
  showSearchResults,
  hideSearchResults,
} from "../../store/actions/SearchingActions";
import {
  dataFetching,
  dataFetched,
  dataError,
} from "../../store/actions/FetchDataActions";

export const SearchSection: React.SFC = () => {
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
  const listOfAlbums = useSelector(
    (state: { searching: GlobalAction }) => state.searching.listOfAlbums
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
          refreshAccessToken(refresh_token, dispatch, setAccessTokens);
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
          if (!isSearchResultsVisible) dispatch(showSearchResults());
          handleSubmit(e);
        }}
      >
        <div className="searchsection__relative">
          <SearchInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            isSearchResultsVisible={isSearchResultsVisible}
            showResults={showSearchResults}
            dispatch={dispatch}
          />
          <SearchButton />
        </div>
      </form>

      <div className="searchsection__resultsPosition">
        {isSearchResultsVisible ? (
          <SearchResult
            dispatch={dispatch}
            hideSearchResults={hideSearchResults}
            listOfAlbums={listOfAlbums}
            setInputValue={setInputValue}
            searchAlbums={searchAlbums}
          />
        ) : null}
      </div>
    </section>
  );
};
