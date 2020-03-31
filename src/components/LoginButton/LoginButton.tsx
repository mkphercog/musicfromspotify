import React from "react";
import "./LoginButton.scss";

export interface LoginButtonProps {}

export const LoginButton: React.SFC<LoginButtonProps> = () => (
  <>
    <a className="loginpage__loginBtn" href="www.google.pl">
      Zaloguj się do Spotify
    </a>
    <a className="loginpage__registerBtn" href="www.google.pl">
      Nie masz konta? Załóż je tutaj.
    </a>
  </>
);
