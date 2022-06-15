import { Box, Button } from "@mui/material";
import { green } from "@mui/material/colors";
import axios from "axios";
import { CouponModel } from "../../Model/CouponModel";
import globals from "../../Utils/globals";
import "./CouponCard.css";

interface CouponCardProps {
  coupon: CouponModel;
}

function CouponCard(props: CouponCardProps) {
  const handlePurchase = () => {
    if (localStorage.getItem("clientType") != "CUSTOMER") {
      alert("please login as a customer or register");
    } else {
      axios
        .post(
          globals.urls.purchaseCoupon + `${props.coupon.id}`,
          {},
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          localStorage.setItem("token", res.headers[`authorization`]);
          alert("coupon purchased successfully");
        })
        .catch((error) => {
          console.log(error.response.data);
          console.error(error.response.data);
          console.error(error.response.status);
          alert(error.response.data.description);
        });
    }
  };

  return (
    <>
      <div className="CouponCard">
        <Box
          sx={{
            width: [120, 220],
            height: [200, 250],
            border: 2,
            borderColor: green,
            bgcolor: "ghostwhite",
            margin: 1,
            color: "black",
            font: "caption",
          }}
        >
          <b>{props.coupon.title}</b> by {props.coupon.companyName} <br />
          coupon's id: {props.coupon.id}
          <br />
          <br />
          <img src={props.coupon.image} alt={props.coupon.title} />
          <br />
          {props.coupon.description} <br />
          Category: {props.coupon.category} <br />
          Amount: {props.coupon.amount} &nbsp; &nbsp; &nbsp; PRICE:{" "}
          {props.coupon.price} <br />
          Start-date: {props.coupon.startDate}
          <br /> End-date: {props.coupon.endDate}
          <br />
          <br />
          <Button variant="outlined" size="small" onClick={handlePurchase}>
            Buy Me
          </Button>
        </Box>
      </div>
    </>
  );
}

export default CouponCard;
