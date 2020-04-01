import React from "react";
import "./Main.scss";
import { SearchSection } from "../SearchSection/SearchSection";
import { AlbumsSection } from "../AlbumsSection/AlbumsSection";
import { PlayerSection } from "../PlayerSection/PlayerSection";

export interface MainProps {}

export const Main: React.SFC<MainProps> = () => {
  return (
    <main className="main">
      <SearchSection />
      <AlbumsSection />
      <PlayerSection />
    </main>
  );
};
