import React from "react";
import { Route } from "react-router-dom";

import LoginForm from "./User/Login";
import RegistrationForm from "./User/Register";

const BaseRouter = () => (
  <div>

    <Route exact path="/register/" component={RegistrationForm} />{" "},
    <Route exact path="/login/" component={LoginForm}/>{" "}
  </div>
);

export default BaseRouter;