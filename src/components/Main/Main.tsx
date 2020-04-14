import React from "react";
import "./Main.scss";
import { SearchSection } from "../SearchSection/SearchSection";
import { AlbumsSection } from "../AlbumsSection/AlbumsSection";

export const Main: React.FC = () => (
  <main className="main">
    <SearchSection />
    <AlbumsSection />
  </main>
);
