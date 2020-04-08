import React, { useEffect } from "react";
import "./App.scss";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { WebsitePage } from "./pages/WebsitePage/WebsitePage";
import { getOptionsToConnect } from "./authorization/config";
import { useDispatch, useSelector } from "react-redux";
import { setAccessTokens } from "./store/actions/AuthorizationActions";
import {
  dataFetching,
  dataFetched,
  dataError,
} from "./store/actions/FetchDataActions";
import { LoadingPage } from "./pages/LoadingPage/LoadingPage";
import { showSearchResults } from "./store/actions/SearchingActions";

export const App = () => {
  const connectOptions = getOptionsToConnect();
  const { codeToGetAccess, fetchOptions } = connectOptions;
  const accessToken = useSelector(
    (state: { authorization: { access_token: string } }) =>
      state.authorization.access_token
  );
  const isFetching = useSelector(
    (state: { fetchData: { featching: boolean } }) => state.fetchData.featching
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (codeToGetAccess && !accessToken) {
      dispatch(dataFetching());
      fetch(`https://accounts.spotify.com/api/token`, fetchOptions)
        .then((res: Response) => {
          if (res.status === 200) return res.json();
          throw new Error();
        })
        .then((res: { access_token: string; refresh_token: string }) => {
          dispatch(dataFetched());
          dispatch(setAccessTokens(res.access_token, res.refresh_token));
          localStorage.setItem("access_token", res.access_token);
          localStorage.setItem("refresh_token", res.refresh_token);
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
      {accessToken ? <WebsitePage /> : <LoginPage />}
    </div>
  );
};
