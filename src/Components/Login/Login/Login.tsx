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
      <Card>
        {
          <Box sx={{ borderBottom: 1, borderStyle: "solid", padding: 2 }}>
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
      </Card>
    </Container>
  );
}
export default Login;
