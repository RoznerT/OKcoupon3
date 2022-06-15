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
import globals from "../../../../Utils/globals";

function OneCompany() {
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
        console.error(error.response.data);
        console.error(error.response.status);
        setShowResults(false);
        //notify.error(response.data.description);
      });
  };
  return (
    <>
      <div>
        <Container>
          <Box>
            <Typography>Please insert id of company to get</Typography>
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
    </>
  );
}
export default OneCompany;
