import React from "react";
import "./Footer.scss";

export interface FooterProps {}

export const Footer: React.SFC<FooterProps> = () => {
  return (
    <footer className="footer">
      <p className="footer__author">Projekt i realizacja Marcin Hercog</p>
    </footer>
  );
};
