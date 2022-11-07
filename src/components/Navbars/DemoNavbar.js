import React, { useState } from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Button,
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container,
  Row,
  Col,
} from "reactstrap";


import Web3 from 'web3'

import UAuth from '@uauth/js'
const uauth=new UAuth({
    clientID: "671f4386-a936-4c08-bd01-fe74f4203f9e",
    redirectUri: "http://localhost:3000",
    scope: "openid wallet"
})

const handleLogin = async () => {
  try {
    const authorization = await uauth.loginWithPopup()
    console.log("Logged in")
    console.log(authorization)
    const walletname=authorization.idToken.wallet_address;
    const domainName=authorization.idToken.sub;
    console.log("wallet address: ",walletname)
    console.log("Domain name: ",domainName)

    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      console.log(window.web3);
    }
    
    window.location.href="/profile-page"

  } catch (error) {
    console.error(error)
  }
}


function DemoNavbar(props){

  const [collapseClasses,setCollapseClasses] = useState("");

  const onExiting = () => {
    setCollapseClasses("collapsing-out");
    };

  const onExited = () => {
    setCollapseClasses("");
  };

return (
    <>
    <header className="header-global">
        <Navbar
        className="navbar-main navbar-transparent navbar-light headroom"
        expand="lg"
        id="navbar-main"
        >
        <Container>
            <NavbarBrand className="mr-lg-5" to="/" tag={Link}>
            <span style={{fontSize: '30px'}} >
            Web3Locker
            </span>
            </NavbarBrand>
            <button className="navbar-toggler" id="navbar_global">
            <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
            toggler="#navbar_global"
            navbar
            className={collapseClasses}
            onExiting={onExiting}
            onExited={onExited}
            >
            <div className="navbar-collapse-header">
                <Row>
                <Col className="collapse-brand" xs="6">
                    <Link to="/">
                    <span style={{fontSize: '30px'}} >
                        Web3Locker
                    </span>
                    </Link>
                </Col>
                </Row>
            </div>
            
            <Nav className="align-items-lg-center ml-lg-auto" navbar>
                <NavItem className="d-none d-lg-block ml-lg-4">
                <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    onClick={handleLogin}
                >
                    <span className="nav-link-inner--text ml-1">
                    Login
                    </span>
                </Button>
                </NavItem>
            </Nav>
            </UncontrolledCollapse>
        </Container>
        </Navbar>
    </header>
    </>
);
}


export default DemoNavbar;
