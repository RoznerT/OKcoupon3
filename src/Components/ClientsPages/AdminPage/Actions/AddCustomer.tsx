import { Container, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import globals from "../../../../Utils/globals";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import KeyIcon from "@mui/icons-material/Key";
import MsgModel from "../../../../Model/MsgModel";
import { useState } from "react";
import Message from "../../../Message/Message";
import Success from "../../../Message/Success";

function AddCustomer() {
  const [isError, setIsError] = useState<boolean>(false);
  const [error,setError] = useState<MsgModel>();  
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [success,setsuccess] = useState<MsgModel>(); 
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    const newData = { ...data, id: 0 };
    axios
      .post(globals.urls.addCustomer, newData, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        localStorage.setItem("token",res.headers[`authorization`].substring(8, 219));
        const Success: MsgModel = {
          status: res.status,
          error: "Success!",
          description: "Customer added"
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
  return (<>
    <Container>
      <Box
        sx={{
          border: 2,
          borderColor: "black",
          borderRadius: 2,
          gap: 2,
          bgcolor: "whitesmoke",
          boxShadow: 8,
          width: 800,
          height: 300,
          align: "center",
          margin: "auto",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ fontWeight: "bold", color: "black" }}>
            Add Customer Form
          </Typography>
          <br/>
          <AccountCircleIcon style={{ color: "grey" }}></AccountCircleIcon>
          <TextField
            {...register("email", { required: "this is required",
             minLength: { value: 4, message: "Min length is 4" }
             })}
            label="email"
            variant="standard"
          />
          {errors.email && <span>{errors.email.message}</span>}
          <br />
          <DriveFileRenameOutlineIcon
            style={{ color: "grey" }}
          ></DriveFileRenameOutlineIcon>
          <TextField
            {...register("firstName", {
              required: "this is required"
            })}
            label="firstName"
            variant="standard"
          />
          {errors.firstName && <span>{errors.name.firstName}</span>}
          <br />
          <DriveFileRenameOutlineIcon
            style={{ color: "grey" }}
          ></DriveFileRenameOutlineIcon>
          <TextField
            {...register("lastName", {
              required: "this is required"
            })}
            label="lastName"
            variant="standard"
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
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
          {errors.password && <span>{errors.password.message}</span>}
          <br />
          <br />
          <Button variant="contained" type="submit">Submit</Button>
        </form>
      </Box>
    </Container>
    <Message isError={isError} error={error} onClickHandle={()=>setIsError(false)}/>
    <Success isSuccess={isSuccess} success={success} onClickHandle={()=>setIsSuccess(false)}/>
</>
  );
}

export default AddCustomer;
