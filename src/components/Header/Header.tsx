import React from "react";
import "./Header.scss";

export const Header: React.FC = () => (
  <header className="header">
    <h1 className="header__title">
      Music from <span className="header__spotify">Spotify</span>
    </h1>
  </header>
);
