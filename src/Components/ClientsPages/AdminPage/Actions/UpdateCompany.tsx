import { Container, Typography, Box, TextField, Button } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import store from "../../../../Redux/store";
import globals from "../../../../Utils/globals";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

function UpdateCompany() {
    const {
        register,
        formState: { errors },
        handleSubmit,
      } = useForm();

      const onSubmit = (data: any ) => {
          console.log("sending data");
        console.log(data)
        axios.put(globals.urls.updateCompany, data, {headers: {
          authorization: `${localStorage.getItem('token')}`
      }})
        .then(res => {
            console.log(res.data)
            localStorage.setItem('token', res.headers[`authorization`]);
            store.getState().authState.jwt = res.headers[`authorization`]
            alert("customer updated successfully")
        })
        .catch(error=>{
          console.log(error.response.data)
      console.error(error.response.data);
      console.error(error.response.status);
          //notify.error(response.data.description);
      });
      }

    return ( <Container>
      <Box sx={{ border: 2, borderColor: "blue", borderRadius: 2, gap: 2, bgcolor: "whitesmoke", boxShadow: 8, width:500, height: 250, align: "center", margin: "auto"   }} >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography sx={{fontWeight: 'bold', color: "black"}}>Update Company Form</Typography>
            <DriveFileRenameOutlineIcon style={{ color: 'grey' }}></DriveFileRenameOutlineIcon>
            <TextField
              {...register("id", {
                required: "this is required",
                //minLength: { value: 4, message: "Min length is 4" },
              })}
              label="company ID - REQUIRED!!!"
              variant="standard"
              placeholder="insert the company id"
            />
            <br /> 
            <AccountCircleIcon style={{ color: 'grey' }}></AccountCircleIcon>
            <TextField
              {...register("email", { required: "this is required" })}
              label="want to change the mail?"
              variant="standard"
              placeholder="insert your new email"
            />
            <br />
            <KeyIcon style={{ color: 'grey' }}></KeyIcon>
            <TextField
              {...register("password", {
                  required: "this is required",
                  //minLength: { value: 4, message: "Min length is 4" },
                })}
                label="want to change the pass?"
                variant="standard"
                placeholder="insert your new password"

              />
            <br />
            <br />
            <Button sx={{color: "royalblue", border: 1, bgcolor: "grey"}} type="submit">Submit</Button>
          </form>
        </Box>
      </Container> );
}

export default UpdateCompany;