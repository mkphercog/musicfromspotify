import React from "react";
import "./LoginPage.scss";
import { LoginButton } from "../../components/LoginButton/LoginButton";

export interface LoginPageProps {}

export const LoginPage: React.SFC<LoginPageProps> = () => (
  <div className="loginpage">
    <LoginButton />
  </div>
);
