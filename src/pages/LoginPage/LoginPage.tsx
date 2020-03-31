import React from "react";
import "./LoginPage.scss";
import loginHeadphones from "../../images/loginHeadphones.jpg";
import { LoginButton } from "../../components/LoginButton/LoginButton";

export interface LoginPageProps {}

export const LoginPage: React.SFC<LoginPageProps> = () => (
  <div
    style={{ backgroundImage: `url(${loginHeadphones})` }}
    className="loginpage"
  >
    <LoginButton />
  </div>
);
