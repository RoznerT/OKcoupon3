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
import CompanyModel from "../../../../Model/CompanyModel";
import MsgModel from "../../../../Model/MsgModel";
import globals from "../../../../Utils/globals";
import Message from "../../../Message/Message";

function OneCompany() {
  const [companyId, setId] = useState<number>(0);
  const [company, setCompany] = useState<CompanyModel>();
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
            {
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{company!.id}</TableCell>
                <TableCell align="center">{company!.name}</TableCell>
                <TableCell align="center">{company!.email}</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  const handleOneCompany = () => {
    axios
      .get<CompanyModel>(globals.urls.getCompany + `${companyId}`, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCompany(res.data);
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
            <Typography><b>which company you want to get? Please insert ID</b></Typography>
            <br/>
            <TextField
              required
              className="inputRounded"
              type="number"
              id="id"
              label="id"
              placeholder="insert id of company"
              value={companyId}
              onChange={(e) => {
                setId(Number(e.target.value));
              }}
            />
            <br />
            <br />
            <Button
              variant="contained"
              value="Search"
              onClick={handleOneCompany}
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
export default OneCompany;
