import { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  public render(): JSX.Element {
    return (
      <div className="Footer">
        About Us: this site was developed by Tal, Nadav, Barak, Asi.
        <br /> Enjoy our work!
      </div>
    );
  }
}

export default Footer;
