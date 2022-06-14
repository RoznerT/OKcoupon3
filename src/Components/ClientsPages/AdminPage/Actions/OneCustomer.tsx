import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import CustomerModel from "../../../../Model/CustomerModel";
import store from "../../../../Redux/store";
import globals from "../../../../Utils/globals";

function OneCustomer() {
    const [customerId, setId] = useState<number>(0);
    const [customer, setCustomer] = useState<CustomerModel>();
    const [showButton, setShowButton] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const ShowUpdateButton = () => (<div><br/>
    <Button variant="outlined" color="secondary" ><Link to={`admin/updateCustomer`}>Click to Update the details</Link></Button>
    </div>
    )
    const Results = () => (
        <div id="results" className="search-results">
            <hr />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><b>Customer ID</b></TableCell>
                    <TableCell align="center"><b>Customer First-Name</b></TableCell>
                    <TableCell align="center"><b>Customer Last-Name</b></TableCell>
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
          </div> 
        )

        const handleOneCustomer = () => {
            //const userData = JSON.parse(localStorage.getItem('userLogged')!);
            axios.get<CustomerModel>(globals.urls.getCustomer+`${customerId}`, {headers: {
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
                setShowButton(true)
            })
            .catch(error=>{
                console.log(error.response.data)
          console.error(error.response.data);
          console.error(error.response.status);
          setShowResults(false)
          setShowButton(false)
                //notify.error(response.data.description);
            })};

    return ( <><div>
        <Container>
        <Box>
          <Typography>Please insert id of customer to get</Typography>
          <TextField required className="inputRounded" type="number" id="id" label="id" placeholder="insert id of customer"
            value={customerId}
            onChange={(e) => { setId(Number(e.target.value));   } } />
          <br /> <br />
          <Button variant="contained" value="Search" onClick={handleOneCustomer}> Submit </Button>
        </Box>
        </Container>
        </div>
        <div>
        { showResults && <Results /> }
        { showResults && <ShowUpdateButton /> }
        </div>
        </>  );
}

export default OneCustomer;