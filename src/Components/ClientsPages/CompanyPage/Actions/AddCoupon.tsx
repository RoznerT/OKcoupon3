import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import globals from "../../../../Utils/globals";
import BusinessIcon from "@mui/icons-material/Business";
import TitleIcon from "@mui/icons-material/Title";
import SubtitlesIcon from "@mui/icons-material/Subtitles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LockClockIcon from "@mui/icons-material/LockClock";
import InventoryIcon from "@mui/icons-material/Inventory";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";

function AddCoupon() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data: any) => {
    const newData = { ...data, id: 0 };
    axios
      .post(globals.urls.addCoupon, data, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        localStorage.setItem("token", res.headers[`authorization`]);
        alert("company added successfully");
      })
      .catch((error) => {
        console.log(error.response.data);
        console.error(error.response.data);
        console.error(error.response.status);
        //notify.error("bad login");
      });
  };

  return (
    <Container>
      <Box
        sx={{
          border: 2,
          borderColor: "blue",
          borderRadius: 2,
          gap: 2,
          bgcolor: "whitesmoke",
          boxShadow: 8,
          width: 500,
          height: 820,
          align: "center",
          margin: "auto",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ fontWeight: "bold", color: "black" }}>
            Add Coupon Form
          </Typography>
          <br />
          <BusinessIcon></BusinessIcon>
          <TextField
            {...register("companyName", { required: "this is required" })}
            label="company name"
            variant="standard"
            placeholder="your company name"
          />
          <br />
          <br />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="FASHION"
                control={<Radio />}
                label="Fashion"
              />
              <FormControlLabel
                value="ELECTRICITY"
                control={<Radio />}
                label="Electricity"
              />
              <FormControlLabel
                value="RESTAURANT"
                control={<Radio />}
                label="Restaurant"
              />
              <FormControlLabel
                value="VACATION"
                control={<Radio />}
                label="Vacation"
              />
              <FormControlLabel
                value="ENTERTAINMENT"
                control={<Radio />}
                label="Entertainment"
              />
              <FormControlLabel
                value="DOGFOOD"
                control={<Radio />}
                label="Dog-Food"
              />
            </RadioGroup>
          </FormControl>
          <br />
          <TitleIcon></TitleIcon>
          <TextField
            {...register("title", {
              required: "this is required",
              minLength: { value: 4, message: "Min length is 4" },
            })}
            label="title"
            variant="standard"
            placeholder="title of coupon"
          />
          <br />
          <SubtitlesIcon></SubtitlesIcon>
          <TextField
            {...register("description", { required: "this is required" })}
            label="description"
            variant="standard"
            placeholder="more details about it"
          />
          <br />
          <CalendarMonthIcon></CalendarMonthIcon>
          <TextField
            {...register("startDate", { required: "this is required" })}
            label="start date"
            variant="standard"
            placeholder="yyyy-mm-dd"
          />
          <br />
          <LockClockIcon></LockClockIcon>
          <TextField
            {...register("endDate", { required: "this is required" })}
            label="end date"
            variant="standard"
            placeholder="yyyy-mm-dd"
          />
          <br />
          <InventoryIcon></InventoryIcon>
          <TextField
            {...register("amount", { required: "this is required" })}
            label="amount"
            variant="standard"
            placeholder="insert the max amount"
          />
          <br />
          <MonetizationOnIcon></MonetizationOnIcon>
          <TextField
            {...register("price", { required: "this is required" })}
            label="price"
            variant="standard"
            placeholder="00.00 format"
          />
          <br />
          <PhotoSizeSelectActualIcon></PhotoSizeSelectActualIcon>
          <TextField
            {...register("image", { required: "this is required" })}
            label="image url"
            variant="standard"
            placeholder="insert link to the image"
          />
          <br />
          <br />
          <Button
            sx={{ color: "royalblue", border: 1, bgcolor: "grey" }}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default AddCoupon;
