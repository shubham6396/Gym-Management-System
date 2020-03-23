import React from "react";
import { Route } from "react-router-dom";

import LoginForm from "./User/Login";
import RegistrationForm from "./User/Register";
import GymList from "./Dashboard/Dashboard";
import SportSelectView from "./Dashboard/GymView";
import UsrProfile from "./Profile/profile";

const BaseRouter = (props) => (
  <div>
    <Route exact path="/register/" component={RegistrationForm} />{" "},
    <Route exact path="/" component={props.isAuthenticated?SportSelectView:LoginForm}/>{" "}
    <Route exact path="/dashboard/" component={SportSelectView}/>{" "}
    <Route exact path="/profile/" component={UsrProfile}/>{" "}
  </div>
);

export default BaseRouter;
