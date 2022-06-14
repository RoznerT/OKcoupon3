import { Button } from "@material-ui/core";
import { Switch, NavLink, Redirect, Route, Link } from "react-router-dom";
import store, { State } from "../../../Redux/store";
import "./Menu.css";
import CustomerMenu from "./CustomerMenu";
import AdminMenu from "./AdminMenu";
import CompanyMenu from "./CompanyMenu";
import { useEffect, useState } from "react";

function Menu() {
  const [role,setRole] =  useState("guest");
  const checkRole = () => {
    setRole(localStorage.getItem("clientType")!);
  }
  useEffect(()=> {
  checkRole() 
},[role])

  return (
    <div>
      {(() => {
        switch (role) {
          
          case "ADMIN":
            return (
              <Switch>
                <Route path="/admin" component={AdminMenu} />
              </Switch>
            );
          case "CUSTOMER":
            return (
              <Switch>
              <Route path="/customer" component={CustomerMenu} />
            </Switch>
               );
          case "COMPANY":
            return ( 
              <Switch>
                <Route path="/company" component={CompanyMenu} />
              </Switch>
              );
           default:
             return(<h3>HELLO GUEST, PLEASE REGISTER OR SIGN IN</h3>)   
        }
      })()}
    </div>
  );
}

export default Menu;
