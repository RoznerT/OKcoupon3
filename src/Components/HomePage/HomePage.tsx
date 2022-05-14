import axios from "axios";
import { url } from "inspector";
import { useState } from "react";
import { couponModel } from "../../Model/CouponModel";
import { CouponAppState } from "../../Redux/CouponRedux";
import CouponCard from "../CouponCard/CouponCard";
import "./HomePage.css";

function HomePage(): JSX.Element {
  const [couponList, setCoupons] = useState<couponModel[]>([]);

  const getDefaultHomePage = () => {
    const url = "http://localhost:8080/guest/allCouponsInSystem";
    axios
      .get<couponModel[]>(url)
      .then((response) => {
        setCoupons(response.data);
      })
      .catch((error) => {});
  };
  return( <div className="HomePage">
       <h1>Coupons List</h1>
       <hr/>
        {couponList.map(item=><CouponCard coupon={item}/>)}
  </div>)
}

export default HomePage;
