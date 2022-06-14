import { Typography, TextField, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Container, Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerModel from "../../../../Model/CustomerModel";
import store from "../../../../Redux/store";
import globals from "../../../../Utils/globals";

function AllCustomers() {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [customerId, setId] = useState<number>(0);
  const ShowDeleteButton = () => (<>
  <Container>
    <Box>
      <Typography>Please insert id of customer to delete</Typography>
      <TextField required className="inputRounded" type="number" id="id" label="id" value={customerId}
        onChange={(e) => { setId(Number(e.target.value));   } } />
      <br/>
      <Button variant="contained" value="Search" onClick={handleDeleteCustomer}> Submit </Button>
    </Box>
    </Container>
  </>)
  const Results = () => (
    <TableContainer component={Paper} >
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
          {customers.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)

const handleDeleteCustomer = () => {
  //const userData = JSON.parse(localStorage.getItem('userLogged')!);
  axios.delete<void>(globals.urls.deleteCustomer+`${customerId}`, {headers: {
    authorization: `${localStorage.getItem('token')}`
      //authorization:  store.getState().authState.jwt
  }})
  .then(res => {
      //setCustomer(res.data);
      //res.headers[`Authorization`]
      //localStorage.setItem("userLogged", JSON.stringify(userData));
      localStorage.setItem('token', (res.headers[`authorization`]).substring(8,219));
      store.getState().authState.jwt = `${(res.headers[`authorization`]).substring(8,219)}`
      alert("customer deleted successfully")

  })
  .catch(error=>{
      console.log(error.response.data)
      console.error(error.response.data);
      console.error(error.response.status);
      //notify.error(response.data.description);
  })};

  const handleAllCustomers = () => { 
    //const userData = JSON.parse(localStorage.getItem('userLogged')!);
    axios.get<CustomerModel[]>(globals.urls.allCustomers, {headers: {
      authorization: `${localStorage.getItem('token')}`
        //authorization:  store.getState().authState.jwt
    }})
    .then(res => {
        setCustomers(res.data);
        console.log(res.data)
        //res.headers[`Authorization`]
        //localStorage.setItem("userLogged", JSON.stringify(userData));
        localStorage.setItem('token', res.headers[`authorization`])
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
    return( <><Button variant="contained" value="Search" onClick={handleAllCustomers}> Show me all customers </Button> <br/><br/>
    <div> { showResults && <Results /> } </div>
    <div> { showResults && <ShowDeleteButton /> } </div>
      </> )
}

export default AllCustomers;