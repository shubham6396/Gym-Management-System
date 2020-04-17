import React from "react";
import { Route } from "react-router-dom";

import LoginForm from "./User/Login";
import RegistrationForm from "./User/Register";
import SportSelectView from "./Dashboard/GymView";
import UsrProfile from "./Profile/profile";
import AboutGym from "./About/About";
import TrackResource from "./Track/TrackResource";
import ContactGym from "./Contact/Contact";

const BaseRouter = (props) => (
  <div>
    <Route exact path="/register/" component={RegistrationForm} />{" "},
    <Route exact path="/" component={props.isAuthenticated?SportSelectView:(props.isStaffAuthenticated?TrackResource:LoginForm)}/>{" "}
    <Route exact path="/dashboard/" component={SportSelectView}/>{" "}
    <Route exact path="/profile/" component={UsrProfile}/>{" "}
    <Route exact path="/about/" component={AboutGym}/>{" "}
    <Route exact path="/contact/" component={ContactGym}/>{" "}
    <Route exact path="/track/" component={TrackResource} />{" "}
  </div>
);

export default BaseRouter;
