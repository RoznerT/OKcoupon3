import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  public render(): JSX.Element {
    return (
      <div className="Header" >
        <div id="title">
        <h1>OKcoupon</h1>
        </div>
        <div id="loginn">
          <Button variant="contained" color="primary" href="/login">
            LOGIN
          </Button>
          &nbsp;
          <Button variant="contained" color="secondary" href="/logout">
            LOGOUT
          </Button>
        </div>
      </div>
    );
  }
}

export default Header;

/*
<NavLink exact to="/login" id="login"> </NavLink>
<NavLink exact to="/logout" > </NavLink>
*/
