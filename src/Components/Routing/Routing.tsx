import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "../ClientsPages/GuestPage/HomePage/HomePage";
import Login from "../Login/Login/Login";
import PageNotFound from "../NotFound/pageNotFound";
import AdminPage from "../ClientsPages/AdminPage";
import CompanyPage from "../ClientsPages/CompanyPage";
import CustomerPage from "../ClientsPages/CustomerPage";
import Register from "../ClientsPages/GuestPage/Actions/Register";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Switch>
        <Route path="/register" component={Register} /> 
        <Route path="/customer" component={CustomerPage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/company" component={CompanyPage} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={HomePage} />
        <Route path="/home" component={HomePage} />
        <Redirect from="/" to="/home" exact />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default Routing;
