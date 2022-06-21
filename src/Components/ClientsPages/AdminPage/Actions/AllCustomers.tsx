import {
  Typography,
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Container,
  Box,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomerModel from "../../../../Model/CustomerModel";
import MsgModel from "../../../../Model/MsgModel";
import globals from "../../../../Utils/globals";
import Message from "../../../Message/Message";

function AllCustomers() {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error,setError] = useState<MsgModel>();  
  useEffect(() => {
    handleAllCustomers();
  }, [customers]);
  
  const Results = () => (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <b>Customer ID</b>
            </TableCell>
            <TableCell align="center">
              <b>Customer First-Name</b>
            </TableCell>
            <TableCell align="center">
              <b>Customer Last-Name</b>
            </TableCell>
            <TableCell align="center">
              <b>Customer Email</b>&nbsp;(contact details)
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.firstName}</TableCell>
              <TableCell align="center">{row.lastName}</TableCell>
              <TableCell align="center">{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const handleAllCustomers = () => {
    axios
      .get<CustomerModel[]>(globals.urls.allCustomers, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCustomers(res.data);
        console.log(res.data);
        localStorage.setItem("token", res.headers[`authorization`]);
        setShowResults(true);
      })
      .catch((error) => {
        console.log(error.response.data);
            console.log();
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
  return (<>
      <div> {showResults && <Results />} </div>
      <Message isError={isError} error={error} onClickHandle={()=>setIsError(false)}/>
      </>
  );
}

export default AllCustomers;
