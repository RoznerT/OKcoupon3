import { Button } from "@mui/material";
import store from "../../../../Redux/store";
import Menu from "../Menu";
import "./MenuFunc.css";

 interface MenuProps {
   children?: JSX.Element;
   clientType?: string;
 }


function MenuFunc(prop:MenuProps): JSX.Element {
    
const clientType = store.getState().authState.clientType;
console.log(clientType)
const renderSwitch = () => {
    switch(store.getState().authState.clientType){
        case "ADMIN":   
             console.log("adminLogged")
            return (<Menu/>);
            break;

            default:
              return (<MenuFunc/>);
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
