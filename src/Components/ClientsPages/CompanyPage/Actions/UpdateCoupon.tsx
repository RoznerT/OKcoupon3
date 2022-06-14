import { Box, Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import BusinessIcon from '@mui/icons-material/Business';
import TitleIcon from '@mui/icons-material/Title';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LockClockIcon from '@mui/icons-material/LockClock';
import InventoryIcon from '@mui/icons-material/Inventory';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { useForm } from "react-hook-form";
import axios from "axios";
import globals from "../../../../Utils/globals";
import store from "../../../../Redux/store";

function UpdateCoupon() {
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();
      const onSubmit = (data: any ) => {
        console.log("sending data");
      console.log(data)
      axios.put(globals.urls.updateCoupon, data, {headers: {
        authorization: `${localStorage.getItem('token')}`
        //authorization: `${store.getState().authState.jwt}`
    }})
      .then(res => {
          console.log(res.data)
          localStorage.setItem('token', res.headers[`authorization`]);
          store.getState().authState.jwt = res.headers[`authorization`]
          alert("coupon updated successfully")
      })
      .catch(error=>{
        console.log(error.response.data)
    console.error(error.response.data);
    console.error(error.response.status);
        //notify.error(response.data.description);
    });
    }
      
    return ( <Container>
        <Box sx={{ border: 2, borderColor: "blue", borderRadius: 2, gap: 2, bgcolor: "whitesmoke", boxShadow: 8, width:500, height: 820, align: "center", margin: "auto"   }} >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={{fontWeight: 'bold', color: "black"}}>Update Coupon Form</Typography><br/>
            <DriveFileRenameOutlineIcon></DriveFileRenameOutlineIcon>
            <TextField
              {...register("id", {
                  required: "this is required",
                  minLength: { value: 4, message: "Min length is 4" },
                })}
                label="coupon ID - REQUIRED!!!"
                variant="standard"
                placeholder="insert the coupon id"  
               />
            <br />
            <BusinessIcon></BusinessIcon>
            <TextField
              {...register("companyName", { required: "this is required" })}
              label="company name"
              variant="standard"
              placeholder="your company name"
            /> 
            <br /><br/>
            <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
            <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
           >
          <FormControlLabel value="FASHION" control={<Radio />} label="Fashion" />
          <FormControlLabel value="ELECTRICITY" control={<Radio />} label="Electricity" />
          <FormControlLabel value="RESTAURANT" control={<Radio />} label="Restaurant" />
          <FormControlLabel value="VACATION" control={<Radio />} label="Vacation" />
          <FormControlLabel value="ENTERTAINMENT" control={<Radio />} label="Entertainment" />
          <FormControlLabel value="DOGFOOD" control={<Radio />} label="Dog-Food" />
          </RadioGroup>
        </FormControl>
            <br /> 
            
            <TitleIcon></TitleIcon>
            <TextField
              {...register("title", {
                  required: "this is required",
                })}
                label="want to change title?"
                variant="standard"
                placeholder="title of coupon"
              />
            <br />
            <SubtitlesIcon></SubtitlesIcon>
            <TextField
              {...register("description", { required: "this is required" })}
              label="want to change description?"
              variant="standard"
              placeholder="more details about it"
            /> 
            <br />
            <CalendarMonthIcon></CalendarMonthIcon>    
            <TextField
              {...register("startDate", { required: "this is required" })}
              label="want to change start date?"
              variant="standard"
              placeholder="yyyy-mm-dd"
            /> 
            <br />
            <LockClockIcon></LockClockIcon>
            <TextField
              {...register("endDate", { required: "this is required" })}
              label="want to change end date?"
              variant="standard"
              placeholder="yyyy-mm-dd"
            /> 
            <br />
            <InventoryIcon></InventoryIcon>
            <TextField
              {...register("amount", { required: "this is required" })}
              label="want to change amount?"
              variant="standard"
              placeholder="insert the max amount"
            /> 
            <br />
            <MonetizationOnIcon></MonetizationOnIcon>
            <TextField
              {...register("price", { required: "this is required" })}
              label="want to change price?"
              variant="standard"
              placeholder="00.00 format"
            /> 
            <br />
            <PhotoSizeSelectActualIcon></PhotoSizeSelectActualIcon>
            <TextField
              {...register("image", { required: "this is required" })}
              label="want to change image?"
              variant="standard"
              placeholder="insert link to the image"
            /> 
            <br />
            <br />
            <Button sx={{color: "royalblue", border: 1, bgcolor: "grey"}} type="submit">Submit</Button>
          </form>
        </Box>
      </Container> );
}

export default UpdateCoupon;