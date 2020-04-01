import React from "react";
import "./Header.scss";

export interface HeaderProps {}

export const Header: React.SFC<HeaderProps> = () => {
  return <header className="header">HEADER</header>;
};
