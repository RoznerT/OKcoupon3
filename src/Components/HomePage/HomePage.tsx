import { ExitToAppSharp } from "@mui/icons-material";
import axios, { AxiosError } from "axios";
import { setDefaultResultOrder } from "dns";
import { url } from "inspector";
import { useEffect, useState } from "react";
import { CouponModel } from "../../Model/CouponModel";
import { CouponAppState } from "../../Redux/CouponRedux";
import CouponCard from "../Coupon/CouponCard/CouponCard";
import "./HomePage.css";

function HomePage(): JSX.Element {
  const [couponList, setCoupons] = useState<CouponModel[]>([]);
  console.log("step 1")

  const getDefaultHomePage = () => {
    console.log("step 2")
    const url = "http://localhost:8080/guest/allCouponsInSystem";
    axios
      .get<CouponModel[]>(url)
      .then((response) => {
        console.log(response.data)
        setCoupons(response.data);
      })
      .catch((error) => {});
      console.log("step 3 in catch")

  };
  return( <div className="HomePage">
       <h1>Coupons List</h1>
       <button onClick={getDefaultHomePage}>Watch All Coupons </button>
       <hr/>
        {couponList.map(item=><CouponCard coupon={item}/>)}
  </div>)
}

export default HomePage;


