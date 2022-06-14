import { Button } from "@mui/material";
import { RouteComponentProps, useHistory } from "react-router-dom";

function CustomerMenu({ match }: RouteComponentProps) {
    const history = useHistory();

    return ( <><br/>
    <Button variant="outlined" size="small" onClick={() => {history.push(`${match.url}/allCoupons`)}}>Watch Your Coupons</Button>&nbsp;&nbsp;&nbsp;
    <Button variant="outlined" size="small" onClick={() => {history.push(`${match.url}/customerDetails`)}}>Customer Details</Button>
    </>);
}

export default CustomerMenu;