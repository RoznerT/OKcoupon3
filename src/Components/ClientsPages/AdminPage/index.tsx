import { Switch, Route } from "react-router-dom";
import HomePage from "../GuestPage/HomePage/HomePage";
import AddCompany from "./Actions/AddCompany";
import AddCustomer from "./Actions/AddCustomer";
import AllCompanies from "./Actions/AllCompanies";
import AllCustomers from "./Actions/AllCustomers";
import CompanyCoupons from "./Actions/CompanyCoupons";
import CustomerCoupons from "./Actions/CustomerCoupons";
import OneCompany from "./Actions/OneCompany";
import OneCustomer from "./Actions/OneCustomer";
import UpdateCompany from "./Actions/UpdateCompany";
import UpdateCustomer from "./Actions/UpdateCustomer";
import UpdateNav from "./Actions/UpdateNav";

function AdminPage({ match }: any) {
  return (
    <>
      <h1>Hello Administrator, please choose from the options above</h1>

      <Switch>
      <Route
          path={`${match.path}/home`}
          exact
          component={HomePage}
        />
        <Route
          path={`${match.path}/allCompanies`}
          exact
          component={AllCompanies}
        />
        <Route
          path={`${match.path}/allCustomers`}
          exact
          component={AllCustomers}
        />
        <Route path={`${match.path}/oneCompany`} exact component={OneCompany} />
        <Route
          path={`${match.path}/oneCustomer`}
          exact
          component={OneCustomer}
        />
        <Route
          path={`${match.path}/companyCoupons`}
          exact
          component={CompanyCoupons}
        />
        <Route
          path={`${match.path}/customerCoupons`}
          exact
          component={CustomerCoupons}
        />
        <Route path={`${match.path}/newCompany`} exact component={AddCompany} />
        <Route
          path={`${match.path}/newCustomer`}
          exact
          component={AddCustomer}
        />
        <Route
          path={`${match.path}/updateCompany`}
          exact
          component={UpdateCompany}
        />
        <Route
          path={`${match.path}/updateCustomer`}
          exact
          component={UpdateCustomer}
        />
        <Route path={`${match.path}/update`} exact component={UpdateNav} />
      </Switch>
    </>
  );
}

export default AdminPage;
