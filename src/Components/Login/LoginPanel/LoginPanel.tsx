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
import notify from "../../../Utils/Notify";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import store from "../../../Redux/store";
import { AuthReducer, tryAdminLogin } from "../../../Redux/AuthRedux";
import { ActionType } from "../../../Actions/ActionType";

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
  const [jwt, setJWT] = useState("no token");
  
  const onSubmit = (data: any) => {
    switch (props.clientType) {
      case "CUSTOMER":
      /*
            tryCustomerLogin(data.userName,data.userPass);
            break


            case "COMPANY":
                tryCompanyLogin(data.userName,data.userPass)

                break
*/
      case "ADMIN":
        const url = "http://localhost:8080/administrator/Login";
        console.log(data);
        axios.post(url, data).then((res) => {
          if (res.data.length < 3) {
            notify.error("Bad login");
            return;
          }
          //history.push("/");
          console.log(res.data);
          //store.dispatch(res.data); /********************/
          store.dispatch(tryAdminLogin(res.data.payload))
          //console.log(store.getState)
          //setJWT(store.getState().authState.jwt);
          history.push("/");
        });
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
              minLength: { value: 4, message: "Min length is 4" },
            })}
            label="Password"
            variant="standard"
          />
          {errors.userPass && <p>{errors.userPass.message}</p>}
          <br />
          <TextField
            {...register("clientType", {
              setValueAs: (value: any) => props.clientType,
            })}
            label="UserType"
            variant="standard"
          />
          <br />
          <br />
          <Button type="submit">Login</Button>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPanel;