import axios from "axios";
import CompanyModel from "../../../../Model/CompanyModel";
import { useState } from 'react'
import globals from "../../../../Utils/globals";
import store from "../../../../Redux/store";
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Container, Button, Box, Typography, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

function AllCompanies() {
    const [companies, setCompanies] = useState<CompanyModel[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [companyId, setId] = useState<number>(0);
  const ShowDeleteButton = () => (<>
  <Container>
    <Box>
      <Typography>Please insert id of company to delete</Typography>
      <TextField required className="inputRounded" type="number" id="id" label="id" value={companyId}
        onChange={(e) => { setId(Number(e.target.value));   } } />
      <br/>
      <Button variant="contained" value="Search" onClick={handleDeleteCompany}> Submit </Button>
    </Box>
    </Container>
  </>)
    const Results = () => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center"><b>Company ID</b></TableCell>
            <TableCell align="center"><b>Company Name</b></TableCell>
            <TableCell align="center"><b>Company Email</b>&nbsp;(contact details)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((row) => (
            <TableRow 
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )

const handleDeleteCompany = () => {
  //const userData = JSON.parse(localStorage.getItem('userLogged')!);
  axios.delete<void>(globals.urls.deleteCompany+`${companyId}`, {headers: {
    authorization: `${localStorage.getItem('token')}`
      //authorization:  store.getState().authState.jwt
  }})
  .then(res => {
      //setCustomer(res.data);
      //res.headers[`Authorization`]
      //localStorage.setItem("userLogged", JSON.stringify(userData));
      localStorage.setItem('token', res.headers[`authorization`]);
      store.getState().authState.jwt = `${res.headers[`authorization`]}`
      alert("company deleted successfully")

  })
  .catch(error=>{
      console.log(error.response.data)
      console.error(error.response.data);
      console.error(error.response.status);
      //notify.error(response.data.description);
  })};
        
    const handleAllCompanies = () => { 
    //const userData = JSON.parse(localStorage.getItem('userLogged')!);
    axios.get<CompanyModel[]>(globals.urls.allCompanies, {headers: {
      authorization: `${localStorage.getItem('token')}`
        //authorization:  store.getState().authState.jwt
    }})
    .then(res => {
        setCompanies(res.data);
        console.log(res.data)
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
    return(<><Button variant="contained" value="Search" onClick={handleAllCompanies}> Show me all companies </Button> <br/><br/> //TODO: when delete a company getting an error in list of coupons and then server error 500
        <div> { showResults && <Results /> } </div>
        <div> { showResults && <ShowDeleteButton /> }</div> 
        </> )
}

export default AllCompanies;

export function buildColumns(): any {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Company name', width: 130 },
    { field: 'email', headerName: 'Email to contact', width: 130 }
  ];
return (columns);
}