import React from "react";
import "./LoadingPage.scss";

export interface LoadingPageProps {}

export const LoadingPage: React.SFC<LoadingPageProps> = () => {
  return (
    <div className="loadingPage">
      <p className="loadingPage__name">Wczytuje dane</p>
    </div>
  );
};
