import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import CompanyModel from "../../../../Model/CompanyModel";
import store from "../../../../Redux/store";
import globals from "../../../../Utils/globals";

function CompanyDetails() {
    const [companyId, setId] = useState<number>(0);
    const [company, setCompany] = useState<CompanyModel>();
    const [showResults, setShowResults] = useState(false);
    const Results = () => (
        <div id="results" className="search-results">
            <hr />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"><b>Company ID</b></TableCell>
                    <TableCell align="center"><b>Company Name</b></TableCell>
                    <TableCell align="center"><b>Company Email</b>&nbsp;(contact details)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{company!.id}</TableCell>
                    <TableCell align="center">{company!.name}</TableCell>
                    <TableCell align="center">{company!.email}</TableCell>
                  </TableRow>}
                </TableBody>
              </Table>
            </TableContainer>
          </div> )
    const handleOneCompany = () => {
        //const userData = JSON.parse(localStorage.getItem('userLogged')!);
        axios.get<CompanyModel>(globals.urls.companyDetails, {headers: {
          authorization: `${localStorage.getItem('token')}`
            //authorization:  store.getState().authState.jwt
        }})
        .then(res => {
            setCompany(res.data);
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
          <Button variant="contained" value="Search" onClick={handleOneCompany}> Show Me Details </Button>
        </div>
        <div> { showResults && <Results /> } </div>
        </> );
}

export default CompanyDetails;

