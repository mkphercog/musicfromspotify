import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";

import { LoginPage } from "./pages/LoginPage/LoginPage";
import { WebsitePage } from "./pages/WebsitePage/WebsitePage";
import { LoadingPage } from "./pages/LoadingPage/LoadingPage";

import { getOptionsToConnect } from "./authorization/config";
import { GlobalStateSelector, GlobalAction } from "./store/storeInterfaces";

import { showSearchResults } from "./store/actions/SearchingActions";
import { setAccessTokens } from "./store/actions/AuthorizationActions";
import {
  dataFetching,
  dataFetched,
  dataError,
} from "./store/actions/FetchDataActions";

export const App = () => {
  const access_token = useSelector(
    (state: GlobalStateSelector) => state.authorization.access_token
  );
  const isFetching = useSelector(
    (state: GlobalStateSelector) => state.fetchData.featching
  );
  const dispatch = useDispatch();

  const connectOptions = getOptionsToConnect();
  const { codeToGetAccess, fetchOptions } = connectOptions;

  useEffect(() => {
    if (codeToGetAccess && !access_token) {
      dispatch(dataFetching());
      fetch(`https://accounts.spotify.com/api/token`, fetchOptions)
        .then((res: Response) => {
          if (res.status === 200) return res.json();
          throw new Error();
        })
        .then((res: GlobalAction) => {
          dispatch(dataFetched());
          dispatch(setAccessTokens(res.access_token, res.refresh_token));
        })
        .catch((err: Error) => {
          dispatch(dataError(err.message));
          console.log(err);
        });
    }

    if (!codeToGetAccess) {
      localStorage.setItem("access_token", "");
      localStorage.setItem("refresh_token", "");
    }

    if (window.innerWidth >= 1024) {
      dispatch(showSearchResults());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {isFetching ? <LoadingPage /> : null}
      {access_token ? <WebsitePage /> : <LoginPage />}
    </div>
  );
};
