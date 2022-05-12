import { Button } from "@material-ui/core";
import { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";


class Menu extends Component {

    public render(): JSX.Element {
        return (
            <div className="Menu">
                <br/>
                
                    
                        <Button variant="outlined" color="secondary" href="/">
                        Home
                        </Button>
                   
                
                <br/>
            </div>
        );
    }
}

export default Menu;

/*
<NavLink exact to="/">  </NavLink>
*/
