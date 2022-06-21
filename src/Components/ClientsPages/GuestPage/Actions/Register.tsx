import { Box, Button, Container, Link, TextField, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import KeyIcon from "@mui/icons-material/Key";
import { useForm } from "react-hook-form";
import axios from "axios";
import globals from "../../../../Utils/globals";
import HomeIcon from '@mui/icons-material/Home';
import { useHistory } from "react-router-dom";
import { useState } from "react";
import MsgModel from "../../../../Model/MsgModel";
import Message from "../../../Message/Message";
import Success from "../../../Message/Success";

function Register() {
  const [isError, setIsError] = useState<boolean>(false);
  const [error,setError] = useState<MsgModel>(); 
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [success,setsuccess] = useState<MsgModel>(); 
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data)
    axios.post(globals.urls.register, data)
    .then((res) => {
      const Success: MsgModel = {
        status: res.status,
        error: "Success!",
        description: "Registartion complete. You can login now..."
      }
      setsuccess(Success);
      setIsSuccess(true);
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
    <><br /><Container>
      <Box
        sx={{
          border: 2,
          borderColor: "blue",
          borderRadius: 2,
          gap: 2,
          bgcolor: "whitesmoke",
          boxShadow: 8,
          width: 500,
          height: 320,
          align: "center",
          margin: "auto",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ fontWeight: "bold", color: "black" }}>
            Welcome! We're happy for your registaration
          </Typography>
          <br/>
          <AccountCircleIcon style={{ color: "grey" }}></AccountCircleIcon>
          <TextField
            {...register("email", { required: "this is required",
            minLength: { value: 4, message: "Min length is 4" }, })}
            label="email"
            variant="standard" 
            />
            {errors.email && <p>{errors.email.message}</p>}
          <br />
          <DriveFileRenameOutlineIcon
            style={{ color: "grey" }}
          ></DriveFileRenameOutlineIcon>
          <TextField
            {...register("firstName", {
              required: "this is required",
            })}
            label="firstName"
            variant="standard" 
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
          <br />
          <DriveFileRenameOutlineIcon
            style={{ color: "grey" }}
          ></DriveFileRenameOutlineIcon>
          <TextField
            {...register("lastName", {
              required: "this is required",
            })}
            label="lastName"
            variant="standard" 
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
          <br />
          <KeyIcon style={{ color: "grey" }}></KeyIcon>
          <TextField
            {...register("password", {
              required: "this is required",
              minLength: { value: 4, message: "Min length is 4" },
            })}
            label="password"
            variant="standard" 
            />
            {errors.password && <p>{errors.password.message}</p>}
          <br />
          <br />
          <Button variant="contained" type="submit">Submit</Button> 
          <br/>
          or back to home page
           <HomeIcon onClick={() => {
          history.push(`/home`);
        }}></HomeIcon>
        </form>
      </Box>
    </Container>
    <Message isError={isError} error={error} onClickHandle={()=>setIsError(false)}/>
    <Success isSuccess={isSuccess} success={success} onClickHandle={()=>setIsSuccess(false)}/>
    </>
  );
}

export default Register;
