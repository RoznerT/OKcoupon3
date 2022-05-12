import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../Login/Login/Login";
import Main from "../MainArea/Main/Main";
import PageNotFound from "../NotFound/pageNotFound";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/home" component={Main} exact />
        <Route path="/" component={Main} exact />
        <Route path="/logout" component={Main} exact />
        <Redirect from="/" to="/home" exact />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default Routing;

/*
 */
