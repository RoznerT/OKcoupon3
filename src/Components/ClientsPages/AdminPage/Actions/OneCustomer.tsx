import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import CustomerModel from "../../../../Model/CustomerModel";
import MsgModel from "../../../../Model/MsgModel";
import globals from "../../../../Utils/globals";
import Message from "../../../Message/Message";

function OneCustomer() {
  const [customerId, setId] = useState<number>(0);
  const [customer, setCustomer] = useState<CustomerModel>();
  const [showResults, setShowResults] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error,setError] = useState<MsgModel>();  
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
      .get<CustomerModel>(globals.urls.getCustomer + `${customerId}`, {
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
      <div>
        <Container>
          <Box sx={{
            border: 2,
            borderColor: "black",
            borderRadius: 2,
            gap: 2,
            bgcolor: "white",
            boxShadow: 8,
            width: 800,
            height: 170,
            align: "center",
            margin: "auto",
            color: "black"
          }}>
            <Typography><b>which customer you want to get? Please insert ID</b></Typography>
            <br/>
            <TextField
              required
              className="inputRounded"
              type="number"
              id="id"
              label="id"
              placeholder="insert id of customer"
              value={customerId}
              onChange={(e) => {
                setId(Number(e.target.value));
              }}
            />
            <br /> <br />
            <Button
              variant="contained"
              value="Search"
              onClick={handleOneCustomer}
            >
              {" "}
              Submit{" "}
            </Button>
          </Box>
        </Container>
      </div>
      <div>{showResults && <Results />}</div>
      <Message isError={isError} error={error} onClickHandle={()=>setIsError(false)}/>
    </>
  );
}

export default OneCustomer;
