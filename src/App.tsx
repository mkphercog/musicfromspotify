import React, { useEffect } from "react";
import "./App.scss";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { WebsitePage } from "./pages/WebsitePage/WebsitePage";
import { getOptionsToConnect } from "./authorization/config";
import { useDispatch, useSelector } from "react-redux";
import { setAccessTokens } from "./store/actions/AuthorizationActions";

export const App = () => {
  const connectOptions = getOptionsToConnect();
  const { codeToGetAccess, fetchOptions } = connectOptions;
  const accessToken = useSelector(
    (state: { authorization: { access_token: string } }) =>
      state.authorization.access_token
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (codeToGetAccess && !accessToken) {
      fetch(`https://accounts.spotify.com/api/token`, fetchOptions)
        .then((res: Response) => {
          if (res.status === 200) return res.json();
          throw new Error();
        })
        .then((res: { access_token: string; refresh_token: string }) => {
          console.log(res);
          dispatch(setAccessTokens(res.access_token, res.refresh_token));
          localStorage.setItem("access_token", res.access_token);
          localStorage.setItem("refresh_token", res.refresh_token);
        })
        .catch((err: Error) => console.log(err));
    }

    if (!codeToGetAccess) {
      localStorage.setItem("access_token", "");
      localStorage.setItem("refresh_token", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">{accessToken ? <WebsitePage /> : <LoginPage />}</div>
  );
};
