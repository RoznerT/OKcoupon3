import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../../Model/CouponModel";
import globals from "../../../../Utils/globals";
import CouponCard from "../../../CouponCard/CouponCard";
import "./HomePage.css";

function HomePage(): JSX.Element {
  const [allCoupons, setAllCoupons] = useState<Boolean>(true);
  const [category, setCategory] = useState("All");
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [filteredByPrice, setFilteredByPrice] = useState<CouponModel[]>([]);
  const filterByPrice = (value: number | number[]) => {
    let c = coupons.filter((x) => x.price < value);
    setFilteredByPrice(c);
  };
  const data = filteredByPrice.length === 0 ? coupons : filteredByPrice;

  const getDefaultHomePage = () => {
    axios
      .get<CouponModel[]>(globals.urls.guestCoupons)
      .then((response) => {
        console.log(response.data);
        setCoupons(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    if (event.target.value === "All") {
      setAllCoupons(true);
    } else setAllCoupons(false);
  };

  useEffect(() => {
    getDefaultHomePage();
  }, [filteredByPrice, category]); 

  return (
    <div className="HomePage">
      <h1>Coupons List</h1>
      <hr />
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
              <MenuItem value={"DogFood"}>Dog Food</MenuItem>
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
    </div>
  );
}

export default HomePage;
