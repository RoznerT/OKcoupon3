import { Box, Container, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import DeletePannel from "./DeletePannel";

function Delete(): JSX.Element {
    const [value, setValue] = useState<string>("Company");
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Container sx={{ marginTop: 5 }}>
        {
          <Box sx={{
            border: 2,
            borderColor: "red",
            borderRadius: 2,
            gap: 2,
            bgcolor: "whitesmoke",
            boxShadow: 8,
            width: 750,
            height: 320,
            align: "center",
            margin: "auto",
            color: "black"
          }}>
            <Tabs onChange={handleChange} value={value} centered>
              <Tab label="Customer" value="Customer" />
              <Tab label="Company" value="Company" />
            </Tabs>
            <br />
            <br />
            <DeletePannel clientType={value} />

          </Box>
        }
    </Container>

      );
}

export default Delete;