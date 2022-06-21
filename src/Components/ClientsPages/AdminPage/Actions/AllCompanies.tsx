import axios from "axios";
import CompanyModel from "../../../../Model/CompanyModel";
import { useEffect, useState } from "react";
import globals from "../../../../Utils/globals";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import MsgModel from "../../../../Model/MsgModel";
import Message from "../../../Message/Message";

function AllCompanies() {
  const [companies, setCompanies] = useState<CompanyModel[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error,setError] = useState<MsgModel>(); 

  useEffect(() => {
    handleAllCompanies();
  }, [companies]);
  const Results = () => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <b>Company ID</b>
            </TableCell>
            <TableCell align="center">
              <b>Company Name</b>
            </TableCell>
            <TableCell align="center">
              <b>Company Email</b>&nbsp;(contact details)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {companies.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

  );



  const handleAllCompanies = () => {
    axios
      .get<CompanyModel[]>(globals.urls.allCompanies, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCompanies(res.data);
        console.log(res.data);
        localStorage.setItem("token", res.headers[`authorization`]);
        setShowResults(true);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setShowResults(false);
        const Error: MsgModel = {
          status: error.response.status,
          error: error.response.data.error,
          description: error.response.data.description
        }
        setError(Error);
        setIsError(true);
        setShowResults(false);
      });
  };
  return (
    <>
      <div> {showResults && <Results />} </div>
      <Message isError={isError} error={error} onClickHandle={()=>setIsError(false)}/>
      </>
  );
}

export default AllCompanies;

export function buildColumns(): any {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Company name", width: 130 },
    { field: "email", headerName: "Email to contact", width: 130 },
  ];
  return columns;
}
