import { Switch, Route } from "react-router-dom";
import AddCoupon from "./Actions/AddCoupon";
import AllCompanyCoupons from "./Actions/AllCompanyCoupons";
import CompanyDetails from "./Actions/CompanyDetails";
import UpdateCoupon from "./Actions/UpdateCoupon";

function CompanyPage({ match }: any) {
  return (
    <>
      <h1>Hello Company, please choose from the options above</h1>
      <Switch>
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
      </Switch>
    </>
  );
}

export default CompanyPage;
