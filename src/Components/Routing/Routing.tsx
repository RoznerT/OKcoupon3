import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import Login from "../Login/Login/Login";
import Main from "../MainArea/Main/Main";
import PageNotFound from "../NotFound/pageNotFound";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={HomePage} exact />
        <Route path="/logout" component={Main} exact />
        <Route path="/" component={HomePage} exact />
        <Redirect from="/" to="/home" exact />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default Routing;

