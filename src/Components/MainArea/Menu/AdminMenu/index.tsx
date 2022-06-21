import { Button } from "@mui/material";
import { RouteComponentProps, useHistory } from "react-router-dom";

function AdminMenu({ match }: RouteComponentProps) {
  const history = useHistory();

  return (
    <>
      <br />
      <Button variant="contained" size="medium" onClick={() => {
          history.push(`${match.url}/home`);
          window.location.reload();
        }}
      >
        Home
      </Button>
      &nbsp;
      <Button variant="outlined" size="small" onClick={() => {
          history.push(`${match.url}/AllCompanies`);
        }}
      >
        All Companies
      </Button>
      &nbsp;
      <Button variant="outlined" size="small" onClick={() => {
          history.push(`${match.url}/AllCustomers`);
        }}
      >
        All Customers
      </Button>
      &nbsp;
      <Button variant="outlined" size="small" onClick={() => {
          history.push(`${match.url}/OneCompany`);
        }}
      >
        Specific Company
      </Button>
      &nbsp;
      <Button variant="outlined" size="small" onClick={() => {
        history.push(`${match.url}/OneCustomer`);
        }}
      >
        Specific Customer
      </Button>
      &nbsp;
      <Button variant="outlined" size="small" onClick={() => {
          history.push(`${match.url}/CompanyCoupons`);
        }}
      >
        Company's Coupons
      </Button>
      &nbsp;
      <Button variant="outlined" size="small" onClick={() => {
          history.push(`${match.url}/CustomerCoupons`);
        }}
      >
        Customer's Coupons
      </Button>
      &nbsp;
      <Button variant="outlined" size="small" onClick={() => {
          history.push(`${match.url}/newCompany`);
        }}
      >
        Add Company
      </Button>
      &nbsp;
      <Button variant="outlined" size="small" onClick={() => {
          history.push(`${match.url}/newCustomer`);
        }}
      >
        Add Customer
      </Button>
      &nbsp;
      <Button variant="outlined" size="small" onClick={() => {
          history.push(`${match.url}/update`);
        }}
      >
        Update
      </Button>
      &nbsp;
      <Button variant="outlined" size="small" onClick={() => {
          history.push(`${match.url}/delete`);
        }}
      >
        Delete User
      </Button>
      &nbsp;
    </>
  );
}

export default AdminMenu;
