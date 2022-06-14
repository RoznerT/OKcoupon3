import { CheckBox, ExitToAppSharp } from "@mui/icons-material";
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, SelectChangeEvent, Slider } from "@mui/material";
import axios, { AxiosError } from "axios";
import { setDefaultResultOrder } from "dns";
import { url } from "inspector";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CouponModel } from "../../../../Model/CouponModel";
import { CouponAppState } from "../../../../Redux/CouponRedux";
import globals from "../../../../Utils/globals";
import CouponCard from "../../../Cards/CouponCard/CouponCard";
import Menu from "../../../MainArea/Menu/Menu";
import "./HomePage.css";

function HomePage(): JSX.Element {
  const [allCoupons, setAllCoupons] = useState<Boolean>(true)
  const [category, setCategory] = useState("All");
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [filteredByPrice, setFilteredByPrice] = useState<CouponModel[]>([]);  
  const filterByPrice = (value: number | number[]) => {
    let c = coupons.filter(x => x.price < value);
    setFilteredByPrice(c)
  }
  const data = filteredByPrice.length === 0 ? coupons : filteredByPrice;

  const getDefaultHomePage = () => {
    axios.get<CouponModel[]>(globals.urls.guestCoupons)
      .then((response) => {
        console.log(response.data)
        setCoupons(response.data);
      })
      .catch((error) => {console.log(error);
      });
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
    if (event.target.value === "All") {
      setAllCoupons(true)
    } else setAllCoupons(false)
  };
  
  useEffect(() => {
    getDefaultHomePage()
  }, [filteredByPrice, category]) //Todo: render everytime we have change in couponList

  return( <div className="HomePage">
       <h1>Coupons List</h1>
       <hr/> 
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
      {category==="All" ? <Box sx={{ width: 1200, align: "center", margin: "auto" }}>
      <Slider
        aria-label="Always visible"
        defaultValue={1001}
        valueLabelDisplay="on"
        step={50}
        marks
        min={1}
        max={1001}
        color="secondary"
        onChange={(_, newValue) => filterByPrice(newValue)} />
    </Box> : coupons.filter(x=> x.category === category).map((item, index) => <CouponCard key={index} coupon={item} />) }
      
  </div>
    <div>
      {allCoupons && data.map((item, index) => <CouponCard key={index} coupon={item} />)}
    </div>
    </div>)
}

export default HomePage;

