import { Route, Switch } from "react-router-dom";
import AllCustomerCoupons from "./Actions/AllCustomerCoupuns";
import CustomerDetails from "./Actions/CustomerDetails";

function CustomerPage({ match } : any) {
    return <>
    <h1>Hello Customer, please choose from the options above</h1>
    <Switch>
        <Route path={`${match.path}/allCoupons`} exact component={AllCustomerCoupons} />
        <Route path={`${match.path}/customerDetails`} exact component={CustomerDetails}/>
    </Switch>
</>
}

export default CustomerPage;
