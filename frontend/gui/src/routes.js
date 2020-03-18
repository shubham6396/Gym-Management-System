import React from "react";
import { Route } from "react-router-dom";

import LoginForm from "./User/Login";
import RegistrationForm from "./User/Register";
import GymList from "./Dashboard/Dashboard";

const BaseRouter = () => (
  <div>

    <Route exact path="/register/" component={RegistrationForm} />{" "},
    <Route exact path="/login/" component={LoginForm}/>{" "}
    <Route exact path="/dashboard/" component={GymList}/>{" "}
  </div>
);

export default BaseRouter;