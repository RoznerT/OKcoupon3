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
import globals from "../../../../Utils/globals";

function AllCustomers() {
  const [customers, setCustomers] = useState<CustomerModel[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [customerId, setId] = useState<number>(0);
  useEffect(() => {
    handleAllCustomers();
  }, [customers]);
  const ShowDeleteButton = () => (
    <><br/>
      <Container>
        <Box sx={{
            border: 2,
            borderColor: "red",
            borderRadius: 2,
            gap: 2,
            bgcolor: "white",
            boxShadow: 8,
            width: 400,
            height: 170,
            align: "center",
            margin: "auto",
            color: "black"
          }}>
          <Typography>want to delete some customer? insert the ID</Typography>
          <br/>
          <TextField
            required
            className="inputRounded"
            type="number"
            id="id"
            label="id"
            value={customerId}
            onChange={(e) => {
              setId(Number(e.target.value));
            }}
          />
          <br /><br/>
          <Button
            variant="contained"
            value="Search"
            onClick={handleDeleteCustomer}
          >
            {" "}
            Submit{" "}
          </Button>
        </Box>
      </Container>
    </>
  );
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

  const handleDeleteCustomer = () => {
    axios
      .delete<void>(globals.urls.deleteCustomer + `${customerId}`, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        localStorage.setItem(
          "token",
          res.headers[`authorization`].substring(8, 219)
        );
        alert("customer deleted successfully");
      })
      .catch((error) => {
        console.log(error.response.data);
        console.error(error.response.data);
        console.error(error.response.status);
        //notify.error(response.data.description);
      });
  };

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
        console.error(error.response.data);
        console.error(error.response.status);
        setShowResults(false);
        //notify.error(response.data.description);
      });
  };
  return (
    <>
      <div> {showResults && <Results />} </div>
      <div> {showResults && <ShowDeleteButton />} </div>
    </>
  );
}

export default AllCustomers;
