import React from "react";
import "./LoginPage.scss";
import loginHeadphones from "../../images/loginHeadphones.jpg";
import { LoginButton } from "../../components/LoginButton/LoginButton";

export const LoginPage: React.SFC = () => (
  <div
    style={{ backgroundImage: `url(${loginHeadphones})` }}
    className="loginpage"
  >
    <LoginButton />
  </div>
);
