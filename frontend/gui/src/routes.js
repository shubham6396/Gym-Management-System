import React from "react";
import { Route } from "react-router-dom";




import RegisterView from "./User/RegisterView";

const BaseRouter = () => (
  <div>

    <Route exact path="/register/" component={RegisterView} />{" "}
  </div>
);

export default BaseRouter;