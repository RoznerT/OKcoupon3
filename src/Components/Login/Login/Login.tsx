import { Box, Card, Container, Tab, Tabs } from "@mui/material";
import { Component, useState } from "react";
import LoginPanel from "../LoginPanel/LoginPanel";
import "./Login.css";

function Login(): JSX.Element {
  const [value, setValue] = useState<string>("CUSTOMER");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Container sx={{ marginTop: 5 }}>
        {
          <Box sx={{
            border: 2,
            borderColor: "black",
            borderRadius: 2,
            gap: 2,
            bgcolor: "whitesmoke",
            boxShadow: 8,
            width: 1100,
            height: 320,
            align: "center",
            margin: "auto",
            color: "black"
          }}>
            <Tabs onChange={handleChange} value={value} centered>
              <Tab label="Customer Login" value="CUSTOMER" />
              <Tab label="Company Login" value="COMPANY" />
              <Tab label="Admin Login" value="ADMIN" />
            </Tabs>
            <br />
            <br />
            <LoginPanel clientType={value} />
          </Box>
        }
      
    </Container>
  );
}
export default Login;
