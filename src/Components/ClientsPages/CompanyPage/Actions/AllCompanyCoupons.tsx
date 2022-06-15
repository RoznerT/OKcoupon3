import {
  Container,
  Button,
  Box,
  Typography,
  TextField,
  SelectChangeEvent,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Slider,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../../Model/CouponModel";
import globals from "../../../../Utils/globals";
import CouponCard from "../../../CouponCard/CouponCard";

function AllCompanyCoupons() {
  const [allCoupons, setAllCoupons] = useState<Boolean>(true);
  const [category, setCategory] = useState("All");
  const [filteredByPrice, setFilteredByPrice] = useState<CouponModel[]>([]);
  const [coupons, setCoupons] = useState<CouponModel[]>([]);
  const [couponId, setId] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
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
  const ShowDeleteButton = () => (
    <>
      <Container>
        <Box>
          <Typography>Please Insert ID Of Coupon To Delete</Typography>
          <br />
          <TextField
            required
            className="inputRounded"
            type="number"
            id="id"
            label="id"
            value={couponId}
            onChange={(e) => {
              setId(Number(e.target.value));
            }}
          />
          <br />
          <br />
          <Button
            variant="contained"
            value="Search"
            onClick={handleDeleteCoupon}
          >
            {" "}
            Submit{" "}
          </Button>
        </Box>
      </Container>
    </>
  );

  const Results = () => (
    <div>
      {coupons.map((item, index) => (
        <CouponCard key={index} coupon={item} />
      ))}
    </div>
  );

  const handleDeleteCoupon = () => {
    axios
      .delete<void>(globals.urls.deleteCoupon + `${couponId}`, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.headers[`authorization`]);
        alert("coupon deleted successfully");
      })
      .catch((error) => {
        console.log(error.response.data);
        console.error(error.response.data);
        console.error(error.response.status);
        //notify.error(response.data.description);
      });
  };
  const handleAllCoupons = () => {
    axios
      .get<CouponModel[]>(globals.urls.allCompanyCoupons, {
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
      <div>
        {" "}
        <ShowDeleteButton />{" "}
      </div>
    </>
  );
}

export default AllCompanyCoupons;
