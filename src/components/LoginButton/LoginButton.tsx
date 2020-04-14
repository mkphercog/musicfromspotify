import React from "react";
import "./LoginButton.scss";
import { URL } from "../../authorization/config";

export const LoginButton: React.FC = () => (
  <div className="login-page__buttons">
    <a className="login-page__login-btn" href={URL}>
      Zaloguj się do Spotify
    </a>
    <a
      className="login-page__register-btn"
      href="https://www.spotify.com/pl/signup/"
    >
      Nie masz konta? Załóż je tutaj.
    </a>
  </div>
);
