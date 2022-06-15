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

function UpdateCustomer() {
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
        alert("customer updated successfully");
      })
      .catch((error) => {
        console.log(error.response.data);
        console.error(error.response.data);
        console.error(error.response.status);
        //notify.error(response.data.description);
      });
  };

  return (
    <Container>
      <Box
        sx={{
          border: 2,
          borderColor: "blue",
          borderRadius: 2,
          gap: 2,
          bgcolor: "whitesmoke",
          boxShadow: 8,
          width: 500,
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
            label="customer ID - REQUIRED!!!"
            variant="standard"
            placeholder="insert the customer id"
          />
          <br />
          <PersonIcon style={{ color: "grey" }}></PersonIcon>
          <TextField
            {...register("firstName")}
            label="want to change first-name?"
            variant="standard"
            placeholder="insert your new first-name"
          />
          <br />
          <PersonIcon style={{ color: "grey" }}></PersonIcon>
          <TextField
            {...register("lastName")}
            label="want to change last-name?"
            variant="standard"
            placeholder="insert your new last-name"
          />
          <br />
          <AccountCircleIcon style={{ color: "grey" }}></AccountCircleIcon>
          <TextField
            {...register("email")}
            label="want to change the mail?"
            variant="standard"
            placeholder="insert your new email"
          />
          <br />
          <KeyIcon style={{ color: "grey" }}></KeyIcon>
          <TextField
            {...register("password")}
            label="want to change the pass?"
            variant="standard"
            placeholder="insert your new password"
          />
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
  );
}
export default UpdateCustomer;
