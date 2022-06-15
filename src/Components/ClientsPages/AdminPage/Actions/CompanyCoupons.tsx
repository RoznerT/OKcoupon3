import {
  Box,
  Button,
  Container,
  TableContainer,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { CouponModel } from "../../../../Model/CouponModel";
import globals from "../../../../Utils/globals";
import CouponCard from "../../../CouponCard/CouponCard";

function CompanyCoupons() {
  const [companyId, setId] = useState<number>(0);
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [showResults, setShowResults] = useState(false);

  const Results = () => (
    <div>
      {coupons.map((item, index) => (
        <CouponCard key={index} coupon={item} />
      ))}
    </div>
  );

  const handleCompanyCoupons = () => {
    axios
      .get<CouponModel[]>(globals.urls.companyCoupons + `${companyId}`, {
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
              <b>Please insert id of company to watch it coupons</b>
            </Typography>
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
              onClick={handleCompanyCoupons}
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

export default CompanyCoupons;
