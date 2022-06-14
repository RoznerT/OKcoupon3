import { Button, ThemeProvider } from "@mui/material";
import UpdateCompany from "./UpdateCompany";
import UpdateCustomer from "./UpdateCustomer";
import { createTheme } from '@mui/material/styles';
import { useHistory } from "react-router-dom";
const theme = createTheme({
    palette: {
      neutral: {
        main: '#e2af23',
        contrastText: '#fff',
      },
    },
  });
  
  declare module '@mui/material/styles' {
    interface Palette {
      neutral: Palette['primary'];
    }
  
    // allow configuration using `createTheme`
    interface PaletteOptions {
      neutral?: PaletteOptions['primary'];
    }
  }
  
  // Update the Button's color prop options
  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      neutral: true;
    }
  }

function UpdateNav() {
  const history = useHistory();

    return (
         <>
            <hr/>
            <div id="update"><h1>What Do You Want To Update?</h1></div>
            <div>
            <ThemeProvider theme={theme}>
             <Button onClick={() => {history.push("/admin/UpdateCompany")}} variant="contained" size="large" color="neutral">COMPANY</Button>
             &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
             <Button onClick={() => {history.push("/admin/UpdateCustomer")}} variant="contained" size="large" color="neutral">CUSTOMER</Button>
             </ThemeProvider>
             </div>
    </> );
}

export default UpdateNav;


