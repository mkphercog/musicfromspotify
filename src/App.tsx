import React, { useState, useEffect } from "react";
import "./App.scss";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { getOptionsToConnect } from "./authorization/config";

export const App = () => {
  const connectOptions = getOptionsToConnect();
  const { codeToGetAccess, fetchOptions } = connectOptions;
  const [accesToken, setAccesToken] = useState(
    codeToGetAccess ? localStorage.getItem("access") : ""
  );

  useEffect(() => {
    if (codeToGetAccess && !accesToken) {
      fetch(`https://accounts.spotify.com/api/token`, fetchOptions)
        .then((res: any) => {
          if (res.status === 200) return res.json();
          throw new Error();
        })
        .then((res: any) => {
          setAccesToken(res.access_token);
          localStorage.setItem("access", res.access_token);
        })
        .catch((err: any) => console.log(err));
    }

    if (!codeToGetAccess) {
      localStorage.setItem("access", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="App">{accesToken ? null : <LoginPage />}</div>;
};
