import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
  } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import MsgModel from "../../../../../Model/MsgModel";
import globals from "../../../../../Utils/globals";
import Message from "../../../../Message/Message";
import DeleteIcon from '@mui/icons-material/Delete';
import Success from "../../../../Message/Success";

  interface DeleteProps {
    children?: JSX.Element;
    clientType: string;
  }

function DeletePannel(props: DeleteProps) {
    const [id, setId] = useState<number>(0);
    const [isError, setIsError] = useState<boolean>(false);
    const [error,setError] = useState<MsgModel>(); 
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [success,setsuccess] = useState<MsgModel>(); 

    const handleDelete = () => {
        switch (props.clientType) {
            case "Company": 
            axios
          .delete<void>(globals.urls.deleteCompany + `${id}`, {
            headers: {
              authorization: `${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            localStorage.setItem("token", res.headers[`authorization`]);
            const Success: MsgModel = {
              status: res.status,
              error: "Success!",
              description: "Company deleted"
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
          break;
          case "Customer": 
          axios
        .delete<void>(globals.urls.deleteCustomer + `${id}`, {
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          localStorage.setItem("token", res.headers[`authorization`]);
          const Success: MsgModel = {
            status: res.status,
            error: "Success!",
            description: "Customer deleted"
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
        break;
        }
        
      };
    return ( <>
    <Container>
        <Box>
            <Typography> <b>PLEASE INSERT ID</b> ({props.clientType})</Typography>
            <br/>
            <TextField
              required
              className="inputRounded"
              type="number"
              id="id"
              label="id"
              value={id}
              onChange={(e) => {
                setId(Number(e.target.value));
              }}
            />
            <br /><br/> <br /><br/>
            <Button startIcon={<DeleteIcon />} variant="contained" color="secondary" value="Search" onClick={handleDelete} >
         Delete no regrats
        </Button> 
        </Box>
      </Container>
      <Message isError={isError} error={error} onClickHandle={()=>setIsError(false)}/>
      <Success isSuccess={isSuccess} success={success} onClickHandle={()=>setIsSuccess(false)}/>
      </> );
}

export default DeletePannel;