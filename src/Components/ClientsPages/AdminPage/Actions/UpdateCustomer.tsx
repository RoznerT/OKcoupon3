import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import axios from "axios";
import globals from "../../../../Utils/globals";
import { useForm } from "react-hook-form";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import PersonIcon from "@mui/icons-material/Person";
import Message from "../../../Message/Message";
import { useState } from "react";
import MsgModel from "../../../../Model/MsgModel";
import Success from "../../../Message/Success";

function UpdateCustomer() {
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
    console.log("sending data");
    console.log(data);
    axios
      .put(globals.urls.updateCustomer, data, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.headers[`authorization`]);
        const Success: MsgModel = {
          status: res.status,
          error: "Success!",
          description: "Customer updated"
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
          height: 330,
          align: "center",
          margin: "auto",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ fontWeight: "bold", color: "black" }}>
            Update Customer Form
          </Typography>
          <DriveFileRenameOutlineIcon
            style={{ color: "grey" }}
          ></DriveFileRenameOutlineIcon>
          <TextField
            {...register("id", {
              required: "this is required",
            })}
            label="customer ID"
            variant="standard"
            placeholder="insert the customer id"
          />
          {errors.id && <span>{errors.id.message}</span>}
          <br />
          <PersonIcon style={{ color: "grey" }}></PersonIcon>
          <TextField
            {...register("firstName", {
              required: "this is required"
            })}
            label="want to change first-name?"
            variant="standard"
            placeholder="insert your new first-name"
          />
          {errors.firstName && <span>{errors.firstName.message}</span>}
          <br />
          <PersonIcon style={{ color: "grey" }}></PersonIcon>
          <TextField
            {...register("lastName", {
            required: "this is required"})}
            label="want to change last-name?"
            variant="standard"
            placeholder="insert your new last-name"
          />
          {errors.lastName && <span>{errors.lastName.message}</span>}
          <br />
          <AccountCircleIcon style={{ color: "grey" }}></AccountCircleIcon>
          <TextField
            {...register("email" ,{
              required: "this is required",
              minLength: { value: 4, message: "Min length is 4" }
            })}
            label="want to change the mail?"
            variant="standard"
            placeholder="insert your new email"
          />
          {errors.email && <span>{errors.email.message}</span>}
          <br />
          <KeyIcon style={{ color: "grey" }}></KeyIcon>
          <TextField
            {...register("password", {
              required: "this is required",
              minLength: { value: 4, message: "Min length is 4" }
            })}
            label="want to change the pass?"
            variant="standard"
            placeholder="insert your new password"
          />
            {errors.password && <span>{errors.password.message}</span>}
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
    <Message isError={isError} error={error} onClickHandle={()=>setIsError(false)}/>
    <Success isSuccess={isSuccess} success={success} onClickHandle={()=>setIsSuccess(false)}/>
</>
  );
}
export default UpdateCustomer;
