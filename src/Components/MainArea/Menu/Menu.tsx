import { Button } from "@material-ui/core";
import { Component } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { State } from "../../../Redux/store";
import "./Menu.css";
import CustomerMenu from './CustomerMenu'

function Menu() {
    const clientType = useSelector((state: State) => state.authState.clientType) 
    //switch --> html element
    return ( <h1> <CustomerMenu />  </h1> );
}

export default Menu;

