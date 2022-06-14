import "./LoginPanel.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Menu,
  TextField,
  Typography,
} from "@material-ui/core";
import notify from "../../../Utils/Notify";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import store from "../../../Redux/store";
import { AuthReducer, tryAdminLogin, tryCompanyLogin, tryCustomerLogin } from "../../../Redux/AuthRedux";
import { ActionType } from "../../../Actions/ActionType";
import { AuthState } from '../../../Redux/AuthRedux'
import globals from "../../../Utils/globals";
interface LoginProps {
  children?: JSX.Element;
  clientType: string;
}

function LoginPanel(props: LoginProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const history = useHistory();
  
  const onSubmit = (data: any ) => {
    const newData = {...data, clientType:props.clientType}
    switch (props.clientType) {
      case "CUSTOMER":
        console.log(newData);
        axios.post(globals.urls.customerLogin, newData).then((res) => {  
          const userInfo: AuthState = {
            userName: data.userName,
            clientType: data.clientType,
            jwt: (res.headers[`authorization`])
          }        
          console.log(res.data);
          //store.dispatch(tryCustomerLogin(userInfo))
          localStorage.setItem('token', (res.headers[`authorization`]));
          localStorage.setItem('clientType', data.clientType);

          history.push("/customer");
        }).catch(response=>{
          console.error(response.data);
          console.error(response.status);
          //notify.error(response.data.description);
      });
        break;

        case "COMPANY":
        console.log(newData);
        axios.post(globals.urls.companyLogin, newData).then((res) => {
          const userInfo: AuthState = {
            userName: data.userName,
            clientType: data.clientType,
            jwt: (res.headers[`authorization`])
          }
          console.log(res.data);
          //store.dispatch(tryCompanyLogin(userInfo))
          localStorage.setItem('token', (res.headers[`authorization`]));
          localStorage.setItem('clientType', data.clientType);
          history.push("/company");
        }).catch(response=>{
          console.error(response.data);
          console.error(response.status);
      });
        break;

      case "ADMIN":
        console.log(newData);
        axios.post(globals.urls.adminLogin, newData).then((res) => {
          const userInfo: AuthState = {
            userName: data.userName,
            clientType: data.clientType,
            jwt: res.headers[`authorization`]
          }
          //store.dispatch(tryAdminLogin(userInfo))
          localStorage.setItem('token', res.headers[`authorization`]);
          localStorage.setItem('clientType', data.clientType);
          history.push("/admin");
        }).catch(error=>{
          console.log(error.response.data)
          console.log(error.response.data.description)
          console.error(error.response.status);
          //notify.error(error.response.data.description);
      })
        break;

      default:
    }
  };

  return (
    <Container>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography>{props.clientType}</Typography>
          <TextField
            {...register("userName", { required: "this is required" })}
            label="userName"
            variant="standard"
          />
          {errors.userName && <p>{errors.userName.message}</p>}
          <br />
          <TextField
            {...register("userPass", {
              required: "this is required",
              //minLength: { value: 4, message: "Min length is 4" },
            })}
            label="Password"
            variant="standard"
          />
          {errors.userPass && <p>{errors.userPass.message}</p>}
          <br />
          
          
          <Button type="submit">Login</Button>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPanel;

/*
<TextField
            {...register("clientType", {
              required: "this is required",
              
            })}
            label="clientType"
            variant="standard"
          />
          <br />
          */