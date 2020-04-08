import React from "react";
import "./LoginButton.scss";
import { URL } from "../../authorization/config";

export const LoginButton: React.SFC = () => (
  <div className="loginpage__buttons">
    <a className="loginpage__loginBtn" href={URL}>
      Zaloguj się do Spotify
    </a>
    <a
      className="loginpage__registerBtn"
      href="https://www.spotify.com/pl/signup/"
    >
      Nie masz konta? Załóż je tutaj.
    </a>
  </div>
);
