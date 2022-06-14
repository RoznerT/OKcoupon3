import { Container, Box, Typography, TextField, Button, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { CouponModel } from "../../../../Model/CouponModel";
import store from "../../../../Redux/store";
import globals from "../../../../Utils/globals";
import CouponCard from "../../../Cards/CouponCard/CouponCard";

function CustomerCoupons() {
    const [customerId, setId] = useState<number>(0);
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [showResults, setShowResults] = useState(false);
    const Results = () => ((<div>{coupons.map((item, index)=><CouponCard key={index} coupon={item}/>)}</div>))
      /*
        <TableContainer component={Paper} sx={{width: [100,200,300,400,500]}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"><b>Company Name</b></TableCell>
                <TableCell align="center"><b>Category</b></TableCell>
                <TableCell align="center"><b>Coupon ID</b></TableCell>
                <TableCell align="center"><b>Coupon Title</b></TableCell>
                <TableCell align="center"><b>Coupon Description</b></TableCell>
                <TableCell align="center"><b>Coupon Start-Date</b></TableCell>
                <TableCell align="center"><b>Coupon End-Date</b></TableCell>
                <TableCell align="center"><b>Amount</b></TableCell>
                <TableCell align="center"><b>Price</b></TableCell>
                <TableCell align="center"><b>IMG</b>&nbsp;(contact details)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.companyName}</TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{row.startDate}</TableCell>
                  <TableCell align="center">{row.endDate}</TableCell>
                  <TableCell align="center">{row.amount}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.image}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>)*/
    const handleCustomerCoupons = () => { 
        //const userData = JSON.parse(localStorage.getItem('userLogged')!);
        axios.get<CouponModel[]>(globals.urls.customerCoupons+`${customerId}`, {headers: {
          authorization: `${localStorage.getItem('token')}`
            //authorization:  store.getState().authState.jwt
        }})
        .then(res => {
            setCoupons(res.data);
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
    return (<><div>
        <Container>
        <Box>
          <Typography>Please insert id of customer to watch it purchases</Typography>
          <TextField required className="inputRounded" type="number" id="id" label="id" placeholder="insert id of company"
            value={customerId}
            onChange={(e) => { setId(Number(e.target.value)); } } />
          <br /><br />
          <Button variant="contained" value="Search" onClick={handleCustomerCoupons}> Submit </Button>
        </Box>
        </Container>
        </div>
        <div>
        { showResults && <Results /> }
        </div>
        </>);
}

export default CustomerCoupons;