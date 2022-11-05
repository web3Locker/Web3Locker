import React,{useState,useRef} from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";

// core components
import LoginNavbar from "components/Navbars/LoginNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import DocumentCard from "components/DocumentCard";

import Web3 from 'web3'

import StorageService from "Storage/storage";



function Profile(props)
 {

  StorageService.init();

  const inputFilePropertyRef = useRef(null);

  const handleFileUpload = async event => {
    event.preventDefault()
    
    
    const file = event.target.files[0]
    console.log(file.name, "Captured...");
    const reader = new window.FileReader()
    
    reader.readAsArrayBuffer(file);
    
    reader.onloadend = () => {

      const blob = new Blob([reader.result]);
      console.log(blob);
      StorageService.upload(blob);
    }
  };

  return (
    <>
        <LoginNavbar />
        <main className="profile-page">
        <section className="section-profile-cover section-shaped">
            {/* Circles background */}
            <div className="shape shape-style-1 shape-default alpha-4">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="fill-white"
                  points="2560 0 2560 100 0 100"
                />
              </svg>
            </div>
          </section>
          <section className="section">
            <Container>
              <Card className="card-profile shadow mt--300">
                <div className="px-4">
                  <Row className="justify-content-center">
                    <Col className="order-lg-2" lg="3">
                      <div className="card-profile-image">
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="..."
                            className="rounded-circle"
                            src={require("assets/img/theme/team-4-800x800.jpg")}
                          />
                        </a>
                      </div>
                    </Col>
                    <Col
                      className="order-lg-3 text-lg-right align-self-lg-center"
                      lg="4"
                    >
                      <div className="card-profile-actions py-0 mt-lg-0">
                         <React.Fragment>
        <input
          ref={inputFilePropertyRef}
          onChange={handleFileUpload}
          type="file"
          style={{ display: "none" }}
          // multiple={false}
        />
        <Button
                          className="float-right"
                          color="info"
                          // href="#pablo"
                          onClick={() =>inputFilePropertyRef.current.click()}
                          size="sm"
                        >
                          Upload
                        </Button>
      </React.Fragment>
                          <Button
                    className="float-left"
                    color="info"
                    href="/shared-with-me"
                    size="sm"
                    >
                    Shared with me
                    </Button>
                        
                        
                      </div>
                    </Col>
                    <Col className="order-lg-1" lg="4">
                      <div className="card-profile-stats d-flex justify-content-center">
                        <div>
                          <span className="heading">22</span>
                          <span className="description">Total uploads</span>
                        </div>
                        {/* <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div> */}
                      </div>
                    </Col>
                  </Row>
                  <div className="text-center mt-5">
                    <h3>
                      Jessica Jones {/*" "*/}
                      {/* <span className="font-weight-light">, 27</span> */}
                    </h3>
                    {/* <div className="h6 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      Bucharest, Romania
                    </div> */}
                    {/* <div className="h6 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Creative Tim Officer
                    </div>
                    <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div> */}
                  </div>
                  <div className="mt-5 py-5 border-top text-center">
                    <Row className="justify-content-center">
                      <Col lg="9">
                        <span>UPLOADS</span>
                        <p>
                          <br></br>
                          {/* <span>INSERT CARDS HERE</span> */}
                          {/* <DocumentCard/> */}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card>
            </Container>
          </section>
        </main>
        <SimpleFooter />
      </>
  )
}

export default Profile