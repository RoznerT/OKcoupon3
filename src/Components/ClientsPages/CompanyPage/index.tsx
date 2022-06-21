import { Switch, Route } from "react-router-dom";
import HomePage from "../GuestPage/HomePage/HomePage";
import AddCoupon from "./Actions/AddCoupon";
import AllCompanyCoupons from "./Actions/AllCompanyCoupons";
import CompanyDetails from "./Actions/CompanyDetails";
import DeleteCoupon from "./Actions/DeleteCoupon";
import UpdateCoupon from "./Actions/UpdateCoupon";

function CompanyPage({ match }: any) {
  return (
    <>
      <h1>Hello Company, please choose from the options above</h1>
      <Switch>
      <Route
          path={`${match.path}/home`}
          exact
          component={HomePage}
        />
        <Route
          path={`${match.path}/allCoupons`}
          exact
          component={AllCompanyCoupons}
        />
        <Route path={`${match.path}/newCoupon`} exact component={AddCoupon} />
        <Route
          path={`${match.path}/updateCoupon`}
          exact
          component={UpdateCoupon}
        />
        <Route
          path={`${match.path}/companyDetails`}
          exact
          component={CompanyDetails}
        />
        <Route
          path={`${match.path}/deleteCoupon`}
          exact
          component={DeleteCoupon}
        />
      </Switch>
    </>
  );
}

export default CompanyPage;
