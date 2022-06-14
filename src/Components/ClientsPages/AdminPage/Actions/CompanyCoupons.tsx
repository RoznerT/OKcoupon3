import { Box, Button, Container, TableContainer, TextField, Typography, Paper, Table, TableHead, TableBody, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { CouponModel } from "../../../../Model/CouponModel";
import store from "../../../../Redux/store";
import globals from "../../../../Utils/globals";
import CouponCard from "../../../Cards/CouponCard/CouponCard";

function CompanyCoupons() {
    const [companyId, setId] = useState<number>(0);
    const [coupons, setCoupons] = useState<CouponModel[]>([]);
    const [showResults, setShowResults] = useState(false);
    
    const Results = () => (
    <div>{

      coupons.map((item, index)=><CouponCard key={index} coupon={item}/>)
      
      }</div>)
  
    const handleCompanyCoupons = () => { 
        //const userData = JSON.parse(localStorage.getItem('userLogged')!);
        axios.get<CouponModel[]>(globals.urls.companyCoupons+`${companyId}`, {headers: {
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
    return ( <><div>
        <Container>
        <Box>
          <Typography>Please insert id of company to watch it coupons</Typography>
          <TextField required className="inputRounded" type="number" id="id" label="id" placeholder="insert id of company"
            value={companyId}
            onChange={(e) => { setId(Number(e.target.value)); } } />
          <br /><br />
          <Button variant="contained" value="Search" onClick={handleCompanyCoupons}> Submit </Button>
        </Box>
        </Container>
        </div>
        <div>
        { showResults && <Results /> }
        </div>
        </> );
}

export default CompanyCoupons;