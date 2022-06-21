import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomerModel from "../../../../Model/CustomerModel";
import MsgModel from "../../../../Model/MsgModel";
import globals from "../../../../Utils/globals";
import Message from "../../../Message/Message";
function CustomerDetails() {
  const [customerId, setId] = useState<number>(0);
  const [customer, setCustomer] = useState<CustomerModel>();
  const [showResults, setShowResults] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error,setError] = useState<MsgModel>();  
  useEffect(() => {
    handleOneCustomer();
  }, [customer]);
  const Results = () => (
    <div id="results" className="search-results">
      <hr />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <b>Customer ID</b>
              </TableCell>
              <TableCell align="center">
                <b>Customer First Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Customer Last Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Customer Email</b>&nbsp;(contact details)
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{customer!.id}</TableCell>
                <TableCell align="center">{customer!.firstName}</TableCell>
                <TableCell align="center">{customer!.lastName}</TableCell>
                <TableCell align="center">{customer!.email}</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
  const handleOneCustomer = () => {
    axios
      .get<CustomerModel>(globals.urls.customerDetails, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCustomer(res.data);
        localStorage.setItem("token", res.headers[`authorization`]);
        setShowResults(true);
      })
      .catch((error) => {
        console.log(error.response.data);
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
      {showResults && <Results />}
      <Message isError={isError} error={error} onClickHandle={()=>setIsError(false)}/>
    </>
  );
}

export default CustomerDetails;
