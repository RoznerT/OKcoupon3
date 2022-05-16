import { Button } from "@mui/material";
import store from "../../../../../../Redux/store";
import Menu from "../../../Menu";
import "./MenuFunc.css";

// interface MenuProps {
//   children?: JSX.Element;
//   clientType?: string;
// }


function MenuFunc(): JSX.Element {
    
const state = store.getState().authState;
console.log( state.clientType)
const renderSwitch = ()=> {
    switch(state.clientType){
        case "ADMIN":   
    
            // <h1>admin logged</h1>
             console.log("adminLogged")
            return (<Menu/>);
    }
}

  return (
    
    <div className="MenuFunc">
        
        <h1>guest</h1>
        {renderSwitch}
    </div>
  );


}

export default MenuFunc;
