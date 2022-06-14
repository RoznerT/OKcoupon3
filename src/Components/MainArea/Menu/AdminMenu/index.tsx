import { Button } from "@mui/material";
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { Link } from "react-router-dom";

function AdminMenu({ match } : RouteComponentProps) {
    const history = useHistory();

    return (<><br/>
    <Button variant="outlined" size="small" onClick={() => {history.push(`${match.url}/AllCompanies`)}}>All Companies</Button> &nbsp;
    <Button variant="outlined" size="small" onClick={() => {history.push(`${match.url}/AllCustomers`)}}>All Customers</Button>&nbsp;
    <Button variant="outlined" size="small" onClick={() => {history.push(`${match.url}/OneCompany`)}}>Specific Company</Button>&nbsp;
    <Button variant="outlined" size="small" onClick={() => {history.push(`${match.url}/OneCustomer`)}}>Specific Customer</Button>&nbsp;
    <Button variant="outlined" size="small" onClick={() => {history.push(`${match.url}/CompanyCoupons`)}}>Company's Coupons</Button>&nbsp;
    <Button variant="outlined" size="small" onClick={() => {history.push(`${match.url}/CustomerCoupons`)}}>Customer's Coupons</Button>&nbsp;
    <Button variant="outlined" size="small" onClick={() => {history.push(`${match.url}/newCompany`)}}>Add Company</Button>&nbsp;
    <Button variant="outlined" size="small" onClick={() => {history.push(`${match.url}/newCustomer`)}}>Add Customer</Button>&nbsp;
    <Button variant="outlined" size="small" onClick={() => {history.push(`${match.url}/update`)}}>Update</Button>&nbsp;
    </>);
}

export default AdminMenu;
/*
<Button variant="contained"><Link to={`${match.url}/updateCustomer`}>Update Customer</Link></Button>&nbsp;
    <Button variant="contained"><Link to={`${match.url}/updateCompany`}>Update Company</Link></Button>&nbsp;

    
    /*<Button variant="contained" size="small"><Link to={`${match.url}/allCompanies`}>All Companies</Link></Button> &nbsp;*/

