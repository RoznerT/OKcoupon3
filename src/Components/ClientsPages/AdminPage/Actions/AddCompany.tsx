import { Container, Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import globals from "../../../../Utils/globals";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import KeyIcon from "@mui/icons-material/Key";
function AddCompany() {
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
        localStorage.setItem(
          "token",
          res.headers[`authorization`].substring(8, 219)
        );
        alert("company added successfully");
      })
      .catch((error) => {
        console.log(error.response.data);
        console.error(error.response.data);
        console.error(error.response.status);
        //notify.error("bad login");
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
          height: 250,
          align: "center",
          margin: "auto",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ fontWeight: "bold", color: "black" }}>
            Add Company Form
          </Typography>
          <AccountCircleIcon style={{ color: "grey" }}></AccountCircleIcon>
          <TextField
            {...register("email", { required: "this is required" })}
            label="email"
            variant="standard"
          />
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

export default AddCompany;
