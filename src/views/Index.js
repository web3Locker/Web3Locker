import React from "react";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";

// index page sections
import Landing from "../views/examples/Landing.js";
import Login from "./IndexSections/Login.js";


// import Dashbord from "./IndexSections/Dashbord.js";

class Index extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <DemoNavbar />
        <main ref="main">
          <Landing/>
          {/* <Login/> */}

          {/* <Dashbord/> */}
        </main>
        <SimpleFooter />
      </>
    );
  }
}

export default Index;