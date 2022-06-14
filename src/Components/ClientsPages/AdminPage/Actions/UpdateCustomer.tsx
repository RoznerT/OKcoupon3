import { Container, Box, Typography, TextField, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, FormGroup, FormControlLabel, Switch } from "@mui/material";
import axios from "axios";
import globals from "../../../../Utils/globals";
import { useForm } from "react-hook-form";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import PersonIcon from '@mui/icons-material/Person';
import store from "../../../../Redux/store";

function UpdateCustomer() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any ) => {
      console.log("sending data");
    console.log(data)
    axios.put(globals.urls.updateCustomer, data, {headers: {
      authorization: `${localStorage.getItem('token')}`
      //authorization: `${store.getState().authState.jwt}`
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
  <Box sx={{ border: 2, borderColor: "blue", borderRadius: 2, gap: 2, bgcolor: "whitesmoke", boxShadow: 8, width:500, height: 330, align: "center", margin: "auto"   }} >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{fontWeight: 'bold', color: "black"}}>Update Customer Form</Typography>
        <DriveFileRenameOutlineIcon style={{ color: 'grey' }}></DriveFileRenameOutlineIcon>
        <TextField
          {...register("id", {
            required: "this is required",
            //minLength: { value: 4, message: "Min length is 4" },
          })}
          label="customer ID - REQUIRED!!!"
          variant="standard"
          placeholder="insert the customer id"
        />
        <br /> 
        <PersonIcon style={{ color: 'grey' }}></PersonIcon>
        <TextField
          {...register("firstName")}
          label="want to change first-name?"
          variant="standard"
          placeholder="insert your new first-name"
        />
        <br />
        <PersonIcon style={{ color: 'grey' }}></PersonIcon>
        <TextField
          {...register("lastName")}
          label="want to change last-name?"
          variant="standard"
          placeholder="insert your new last-name"
        />
        <br />
        <AccountCircleIcon style={{ color: 'grey' }}></AccountCircleIcon>
        <TextField
          {...register("email")}
          label="want to change the mail?"
          variant="standard"
          placeholder="insert your new email"
        />
        <br />
        <KeyIcon style={{ color: 'grey' }}></KeyIcon>
        <TextField
          {...register("password")}
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
export default UpdateCustomer;

/*

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
          authorization: `${store.getState().authState.jwt}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        store.getState().authState.jwt = res.headers[`authorization`];
      })
      .catch((error) => {
        console.log(error.response.data);
        console.error(error.response.data);
        console.error(error.response.status);
        //notify.error(response.data.description);
      });
  };

<Container>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography>Update Customer Form</Typography>
            <TextField
              {...register("email", { required: "this is required" })}
              label="email"
              variant="standard"
            />
            <br />
            <TextField
              {...register("id", {
                required: "this is required",
                //minLength: { value: 4, message: "Min length is 4" },
              })}
              label="id"
              variant="standard"
            />
            <br /> 
            <TextField
              {...register("firstName", {
                required: "this is required",
                //minLength: { value: 4, message: "Min length is 4" },
              })}
              label="firstName"
              variant="standard"
            />
            <br /> 
            <TextField
              {...register("lastName", {
                required: "this is required",
                minLength: { value: 4, message: "Min length is 4" },
              })}
              label="lastName"
              variant="standard"
            />
            <br /> 
            <TextField
              {...register("password", {
                  required: "this is required",
                  //minLength: { value: 4, message: "Min length is 4" },
                })}
                label="password"
                variant="standard"
              />
            <br />
            <br />
            <button> Submit</button>
          </form>
        </Box>
      </Container>

      </Container><div>
        <h1>Company Details</h1>
        <hr />
        <h2>Company ID: {company?.id}</h2><br />
        <h2>Company NAME: {company?.name}</h2><br />
        <h2>Company EMAIL: {company?.email}</h2><br />
      */
     /*
     <TextField {...register("firsName", {
                //minLength: { value: 4, message: "Min length is 4" },
              })} id="firstName" label="Enter you new first name" variant="filled" />
              <TextField {...register("lastName", {
                //minLength: { value: 4, message: "Min length is 4" },
              })} id="lastName" label="Enter you new last name" variant="filled" />
      <TextField {...register("email", {
                //minLength: { value: 4, message: "Min length is 4" },
              })} id="email" label="Enter you new email" variant="filled" />
              */

              /*
    const customerDetails = { 
      email: data.email===undefined? customer!.email : data.email,
      firstName: data.firstName===undefined? customer!.firstName : data.firstName,
      id: customerId,
      lastName: data.lastName===undefined? customer!.lastName : data.lastName,
      password: data.password,
       }

      axios.put<any>(globals.urls.updateCustomer, customerDetails, {headers: {
        authorization: `${store.getState().authState.jwt}`
    }}).then((res)=>{
    store.getState().authState.jwt = res.headers[`authorization`]
  })
    .catch(error=>{
      console.log(error.response.data)
  console.error(error.response.data);
  console.error(error.response.status);
      //notify.error(response.data.description);
  })}
  */