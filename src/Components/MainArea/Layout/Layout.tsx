import { Component, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import store from "../../../Redux/store";
import Routing from "../../Routing/Routing";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Menu from "../Menu/Menu";
import "./Layout.css";

//const [clientType, setClientType] = useState<string>("CUSTOMER");
const value = store.getState().authState.clientType;


class Layout extends Component {
  public render(): JSX.Element {
    return (
      <BrowserRouter>
        <div className="layout">
          

          <header>
            <Header />
            
          </header>
          
          <aside>
      
            <Menu />
          </aside>

          <main>
            <Routing />
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default Layout;
