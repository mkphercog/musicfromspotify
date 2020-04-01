import React from "react";
import "./WebsitePage.scss";
import { Header } from "../../components/Header/Header";
import { Main } from "../../components/Main/Main";
import { Footer } from "../../components/Footer/Footer";

export interface WebsitePageProps {}

export const WebsitePage: React.SFC<WebsitePageProps> = () => (
  <div className="websitepage">
    <Header />
    <Main />
    <Footer />
  </div>
);
