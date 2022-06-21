import "./LoginPanel.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import globals from "../../../Utils/globals";
import HomeIcon from '@mui/icons-material/Home';
import { useState } from "react";
import MsgModel from "../../../Model/MsgModel";
import Message from "../../Message/Message";

export class AuthState {
  public userName: string = "";
  public clientType: string = "";
  public jwt: string = "";
}
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
  const [isError, setIsError] = useState<boolean>(false);
  const [error,setError] = useState<MsgModel>();  

  const onSubmit = (data: any) => {
    const newData = { ...data, clientType: props.clientType };
    switch (props.clientType) {
      case "CUSTOMER":
        console.log(newData);
        axios
          .post(globals.urls.customerLogin, newData)
          .then((res) => {
            const userInfo: AuthState = {
              userName: data.userName,
              clientType: data.clientType,
              jwt: res.headers[`authorization`],
            };
            console.log(res.data);
            localStorage.setItem("token", res.headers[`authorization`]);
            localStorage.setItem("clientType", newData.clientType);
            history.push("/customer");
            window.location.reload();
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
        break;

      case "COMPANY":
        console.log(newData);
        axios
          .post(globals.urls.companyLogin, newData)
          .then((res) => {
            const userInfo: AuthState = {
              userName: data.userName,
              clientType: data.clientType,
              jwt: res.headers[`authorization`],
            };
            console.log(res.data);
            localStorage.setItem("token", res.headers[`authorization`]);
            localStorage.setItem("clientType", newData.clientType);
            history.push("/company");
            window.location.reload();
          })
          .catch((error) => {
            console.log(error.response.data);
            console.log();
            const Error: MsgModel = {
              status: error.response.status,
              error: error.response.data.error,
              description: error.response.data.description
            }
            setError(Error);
            setIsError(true);
          });
        break;

      case "ADMIN":
        console.log(newData);
        axios
          .post(globals.urls.adminLogin, newData)
          .then((res) => {
            const userInfo: AuthState = {
              userName: data.userName,
              clientType: data.clientType,
              jwt: res.headers[`authorization`],
            };
            localStorage.setItem("token", res.headers[`authorization`]);
            localStorage.setItem("clientType", newData.clientType);
            history.push("/admin");
            window.location.reload();
          })
          .catch((error) => {
            console.log(error.response.data);
            console.log();
            const Error: MsgModel = {
              status: error.response.status,
              error: error.response.data.error,
              description: error.response.data.description
            }
            setError(Error);
            setIsError(true);
          });
        break;

      default:
    }
  };

  return (<>
    <Container>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography>{props.clientType}</Typography>
          <TextField
            {...register("userName", {
              required: "this is required",
              minLength: { value: 4, message: "Min length is 4" },
            })}
            label="userName"
            variant="standard"
          />
          {errors.userName && <p>{errors.userName.message}</p>}
          <br />
          <TextField
            {...register("userPass", {
              required: "this is required",
              minLength: { value: 4, message: "Min length is 4" },
            })}
            label="Password"
            variant="standard"
          />
          {errors.userPass && <p>{errors.userPass.message}</p>}
          <br /> <br/>
          <Button variant="contained" type="submit">Login</Button>
        </form>
        <br/>
          or back to home page
           <HomeIcon onClick={() => {
          history.push(`home`);
        }}></HomeIcon>
      </Box>
    </Container>

<Message isError={isError} error={error} onClickHandle={()=>setIsError(false)}/>
</>
  );
}

export default LoginPanel;
