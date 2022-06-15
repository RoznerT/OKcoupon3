import { Button, Container } from "@mui/material";
import { useHistory } from "react-router-dom";
function HeaderS() {
    const history = useHistory();
    const cleanUserDetails = () => {
        localStorage.setItem("token", "user Logged out");
        localStorage.setItem("clientType", "guest");
    }
    return ( 
        <div className="Header">
        OKcoupon
        <Container sx={{padding: "right"}}>
        <div id="loginn">
          <Button variant="contained" onClick={() => {
          history.push(`/register`);
          window.location.reload();
        }}>
            Register
          </Button>
          &nbsp;
          <Button variant="contained" color="primary" onClick={() => {
          history.push(`/login`);
          window.location.reload();
        }}>
            LOGIN
          </Button>
          &nbsp;
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
                cleanUserDetails();
                history.push(`/logout`);
          window.location.reload();
            }}
          >
            LOGOUT
          </Button>
          &nbsp;
          <Button variant="contained" onClick={() => {
          history.push(`/home`);
          window.location.reload();
        }}>
            Home
          </Button>
          <br />
        </div>
        </Container>
      </div>
     );
}

export default HeaderS;