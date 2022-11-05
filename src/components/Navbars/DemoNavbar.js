import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Headroom from "headroom.js";
// import { useNavigate } from "react-router-dom";
import {
  Button,
  UncontrolledCollapse,
  // DropdownMenu,
  // DropdownItem,
  // DropdownToggle,
  // UncontrolledDropdown,
  // Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// import web3modal from '../../web3modal.ts'
import Web3 from 'web3'
// import uauthOptions from '../../web3modal.ts'
import UAuth from '@uauth/js'
const uauth=new UAuth({
    clientID: "671f4386-a936-4c08-bd01-fe74f4203f9e",
    redirectUri: "http://localhost:3000",
    scope: "openid wallet"
})

// async function handleLogin() {
//   const provider = await web3modal.connect()
//   console.log("hello1")
//   console.log(provider)
//   const user = new UAuth(uauth).user().then().catch()
//   console.log("hello2")
//   console.log("hkvyfiygfiy",user)
// // const authorization = await uauth.authorization();
// // const account = uauth.getAuthorizationAccount(authorization);
// // console.log("hzdfh"+account)

  
//   const authorization = await uauthOptions.loginWithPopup();
//   console.log(authorization)
//   const walletname=authorization.idToken.wallet_address;
//   console.log("wallet",walletname)
// // const account = UAuth.getAuthorizationAccount(authorization);
// // console.log("hello3")

// // console.log(account)
// }
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

// async function handleLogout() {
//   if (web3modal.cachedProvider === 'custom-uauth') {
//     await uauth.logout()
//   }
//   web3modal.clearCachedProvider()
// }

function DemoNavbar(props){
  // const componentDidMount = () => {
  //   let headroom = new Headroom(document.getElementById("navbar-main"));
  //   headroom.init();
  // }

  const [collapseClasses,setCollapseClasses] = useState("");
  // const [collapseOpen, setCollapseOpen] = useState(false);

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
            {/* <img
                alt="..."
                src={require("assets/img/brand/argon-react-white.png")}
            /> */}
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
                
                <NavItem>
                <NavLink
                    className="nav-link-icon"
                    href="https://github.com/creativetimofficial/argon-design-system-react"
                    id="tooltip112445449"
                    target="_blank"
                >
                    <i className="fa fa-github" />
                    <span className="nav-link-inner--text d-lg-none ml-2">
                    Github
                    </span>
                </NavLink>
                <UncontrolledTooltip delay={0} target="tooltip112445449">
                    Star us on Github
                </UncontrolledTooltip>
                </NavItem>
                <NavItem className="d-none d-lg-block ml-lg-4">
                <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    onClick={handleLogin}
                    // href="/profile-page"
                    // target="_blank"
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
