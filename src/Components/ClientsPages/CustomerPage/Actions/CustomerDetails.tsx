import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import CustomerModel from "../../../../Model/CustomerModel";
import store from "../../../../Redux/store";
import globals from "../../../../Utils/globals";
function CustomerDetails() {
    const [customerId, setId] = useState<number>(0);
    const [customer, setCustomer] = useState<CustomerModel>();
    const [showResults, setShowResults] = useState(false);
    const Results = () => (
        <div id="results" className="search-results">
            <hr />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><b>Customer ID</b></TableCell>
                    <TableCell align="center"><b>Customer First Name</b></TableCell>
                    <TableCell align="center"><b>Customer Last Name</b></TableCell>
                    <TableCell align="center"><b>Customer Email</b>&nbsp;(contact details)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{customer!.id}</TableCell>
                    <TableCell align="center">{customer!.firstName}</TableCell>
                    <TableCell align="center">{customer!.lastName}</TableCell>
                    <TableCell align="center">{customer!.email}</TableCell>
                  </TableRow>}
                </TableBody>
              </Table>
            </TableContainer>
          </div> )
    const handleOneCustomer = () => {
        //const userData = JSON.parse(localStorage.getItem('userLogged')!);
        axios.get<CustomerModel>(globals.urls.customerDetails, {headers: {
          authorization: `${localStorage.getItem('token')}`
            //authorization:  store.getState().authState.jwt
        }})
        .then(res => {
            setCustomer(res.data);
            //res.headers[`Authorization`]
            //localStorage.setItem("userLogged", JSON.stringify(userData));
            localStorage.setItem('token', res.headers[`authorization`]);
            store.getState().authState.jwt = `${res.headers[`authorization`]}`
            setShowResults(true)
        })
        .catch(error=>{
            console.log(error.response.data)
      console.error(error.response.data);
      console.error(error.response.status);
      setShowResults(false)
            //notify.error(response.data.description);
        })};
    return ( <>
        <div>
          <Button variant="contained" value="Search" onClick={handleOneCustomer}> Show Me Details </Button>
        </div>
        <div> { showResults && <Results /> } </div>
        </> );
}

export default CustomerDetails;