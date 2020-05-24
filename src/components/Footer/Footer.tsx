import React from "react";
import "./Footer.scss";

export const Footer: React.FC = () => (
  <footer className="footer">
    <p className="footer__author">
      Projekt i realizacja{" "}
      <a
        className="footer__author--link"
        href="https://mkphercog.github.io/mywebsite"
        target="_blank"
        rel="noopener noreferrer"
      >
        Marcin Hercog
      </a>
    </p>
  </footer>
);
