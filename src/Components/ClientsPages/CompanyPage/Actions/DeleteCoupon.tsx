import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
  } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import MsgModel from "../../../../Model/MsgModel";
import globals from "../../../../Utils/globals";
import DeleteIcon from '@mui/icons-material/Delete';
import Message from "../../../Message/Message";
import Success from "../../../Message/Success";


function DeleteCoupon() {
    const [id, setId] = useState<number>(0);
    const [isError, setIsError] = useState<boolean>(false);
    const [error,setError] = useState<MsgModel>(); 
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [success,setsuccess] = useState<MsgModel>(); 
    const handleDelete = () => {
        axios
          .delete<void>(globals.urls.deleteCoupon + `${id}`, {
            headers: {
              authorization: `${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            localStorage.setItem("token", res.headers[`authorization`]);
            const Success: MsgModel = {
              status: res.status,
              error: "Success!",
              description: "Coupon deleted"
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
    }
    return ( <>
        <Container>
            <Box sx={{
            border: 2,
            borderColor: "red",
            borderRadius: 2,
            bgcolor: "whitesmoke",
            boxShadow: 8,
            width: 750,
            height: 320,
            margin: "auto",
            color: "black"
          }}>
                <Typography> <b>PLEASE INSERT ID</b> (of Coupon)</Typography>
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

export default DeleteCoupon;