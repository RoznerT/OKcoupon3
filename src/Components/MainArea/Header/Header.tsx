import { Button, Toolbar, Typography } from "@material-ui/core";
import { Component } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import store from "../../../Redux/store";
import { tryLogout } from "../../../Redux/AuthRedux";


class Header extends Component {
  public render(): JSX.Element {
    return (
        <div className="Header"> 
        
          OKcoupon
        
        <div id="loginn">
          <Button variant="contained" color="primary" href="/login"> LOGIN </Button> &nbsp;
          <Button variant="contained" color="secondary" href="/logout" onClick={handleClick}> LOGOUT </Button> &nbsp;
          <Button variant="contained" href="/home"> Home</Button><br />
        </div>
        </div>
    );
  }
}

export default Header;

export function handleClick() {
  localStorage.setItem('token', "user Logged out");
  localStorage.setItem('clientType', "guest");
  store.getState().authState.jwt = "userLoggedOut"
  store.getState().authState.clientType = "GUEST"
}

/*
<NavLink exact to="/login" id="login"> </NavLink>
<NavLink exact to="/logout" > </NavLink>
*/
