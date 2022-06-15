import { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "../../Routing/Routing";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import "./Layout.css";

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
