import { Switch, Route, Link } from "react-router-dom";
import "./Menu.css";
import CustomerMenu from "./CustomerMenu";
import AdminMenu from "./AdminMenu";
import CompanyMenu from "./CompanyMenu";
import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
function Menu() {
  const [role, setRole] = useState("guest");
  const checkRole = () => {
    setRole(localStorage.getItem("clientType")!);
  };
  
  useEffect(() => {
    checkRole();
  }, [role]);

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
            return (
            <div>
              <h3>HELLO GUEST! please register or sign in</h3>
            </div>);
        }
      })()}
    </div>
  );
}

export default Menu;
