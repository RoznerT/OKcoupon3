import {
  Box,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../../Model/CouponModel";
import MsgModel from "../../../../Model/MsgModel";
import globals from "../../../../Utils/globals";
import CouponCard from "../../../CouponCard/CouponCard";
import Message from "../../../Message/Message";

function AllCustomerCoupons() {
  const [allCoupons, setAllCoupons] = useState<Boolean>(true);
  const [category, setCategory] = useState("All");
  const [filteredByPrice, setFilteredByPrice] = useState<CouponModel[]>([]);
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [couponId, setId] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);
  const [error,setError] = useState<MsgModel>();  
  const filterByPrice = (value: number | number[]) => {
    let c = coupons.filter((x) => x.price < value);
    setFilteredByPrice(c);
  };
  const data = filteredByPrice.length === 0 ? coupons : filteredByPrice;
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    if (event.target.value === "All") {
      setAllCoupons(true);
    } else setAllCoupons(false);
  };

  useEffect(() => {
    handleAllCoupons();
  }, [filteredByPrice, category]);
  const Results = () => (
    <div>
      {coupons.map((item, index) => (
        <CouponCard key={index} coupon={item} />
      ))}
    </div>
  );
  const handleAllCoupons = () => {
    axios
      .get<CouponModel[]>(globals.urls.allCustomerCoupons, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setCoupons(res.data);
        console.log(res.data);
        localStorage.setItem("token", res.headers[`authorization`]);
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
      });
  };
  return (
    <>
      <div>
        <Box sx={{ width: 800, align: "center", margin: "auto" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="category"
              id="category"
              value={category}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value={"All"}>All Categories</MenuItem>
              <MenuItem value={"FASHION"}>Fashion</MenuItem>
              <MenuItem value={"ELECTRICITY"}>Electricity</MenuItem>
              <MenuItem value={"RESTAURANT"}>Restaurant</MenuItem>
              <MenuItem value={"VACATION"}>Vacation</MenuItem>
              <MenuItem value={"ENTERTAINMENT"}>Entertainment</MenuItem>
              <MenuItem value={"DOGFOOD"}>Dog Food</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        {category === "All" ? (
          <Box sx={{ width: 1200, align: "center", margin: "auto" }}>
            <Slider
              aria-label="Always visible"
              defaultValue={1001}
              valueLabelDisplay="on"
              step={50}
              marks
              min={1}
              max={1001}
              color="secondary"
              onChange={(_, newValue) => filterByPrice(newValue)}
            />
          </Box>
        ) : (
          coupons
            .filter((x) => x.category === category)
            .map((item, index) => <CouponCard key={index} coupon={item} />)
        )}
      </div>
      <div>
        {allCoupons &&
          data.map((item, index) => <CouponCard key={index} coupon={item} />)}
      </div>
      <Message isError={isError} error={error} onClickHandle={()=>setIsError(false)}/>
    </>
  );
}

export default AllCustomerCoupons;
