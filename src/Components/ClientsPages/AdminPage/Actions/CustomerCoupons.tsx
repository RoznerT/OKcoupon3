import { Container, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { CouponModel } from "../../../../Model/CouponModel";
import MsgModel from "../../../../Model/MsgModel";
import globals from "../../../../Utils/globals";
import CouponCard from "../../../CouponCard/CouponCard";
import Message from "../../../Message/Message";

function CustomerCoupons() {
  const [customerId, setId] = useState<number>(0);
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error,setError] = useState<MsgModel>();  
  const Results = () => (
    <div>
      {coupons.map((item, index) => (
        <CouponCard key={index} coupon={item} />
      ))}
    </div>
  );
  const handleCustomerCoupons = () => {
    axios
      .get<CouponModel[]>(globals.urls.customerCoupons + `${customerId}`, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCoupons(res.data);
        console.log(res.data);
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
            <Typography>
            <b>Please insert id of customer to watch it coupons</b>            
            </Typography>
            <br/>
            <TextField
              required
              className="inputRounded"
              type="number"
              id="id"
              label="id"
              placeholder="insert id of company"
              value={customerId}
              onChange={(e) => {
                setId(Number(e.target.value));
              }}
            />
            <br />
            <br />
            <Button
              variant="contained"
              value="Search"
              onClick={handleCustomerCoupons}
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

export default CustomerCoupons;
