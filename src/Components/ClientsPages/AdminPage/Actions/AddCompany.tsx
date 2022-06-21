import { Container, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import globals from "../../../../Utils/globals";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import KeyIcon from "@mui/icons-material/Key";
import { useState } from "react";
import MsgModel from "../../../../Model/MsgModel";
import Message from "../../../Message/Message";
import Success from "../../../Message/Success";
function AddCompany() {
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
      .post(globals.urls.addCompany, data, {
        headers: {
          authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        localStorage.setItem("token",res.headers[`authorization`]);
        const Success: MsgModel = {
          status: res.status,
          error: "Success!",
          description: "Company added"
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
          height: 250,
          align: "center",
          margin: "auto",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ fontWeight: "bold", color: "black" }}>
            Add Company Form
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
            {...register("name", {
              required: "this is required",
              minLength: { value: 4, message: "Min length is 4" },
            })}
            label="name"
            variant="standard"
          />
          {errors.name && <span>{errors.name.message}</span>}
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
          <Button
            type="submit"
            variant="contained"
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

export default AddCompany;
