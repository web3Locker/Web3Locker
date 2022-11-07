import React from "react";

// reactstrap components
import {
  Badge,
  // Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";


class Landing extends React.Component {
  state = {};
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  render() {
    return (
      <>
        <main ref="main">
          <div className="position-relative">
            <section className="section section-lg section-shaped">
              <div className="shape shape-style-1 shape-default">
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
              <Container className="py-lg-md d-flex ">
                <div className="col px-0">
                  <Row>
                    <Col lg="6">
                      <h1 className="display-3 text-white my-3">
                        <span>Safeguard All The Documents</span>
                      </h1>
                      <p className="lead text-white">
                        Web3Locker allows the users to create their accounts and
                        upload their documents. These verified documents can be
                        shared and accessed by the user as desired. 
                        It also uses the concept of zero knowledge proof to verify the documents.
                      </p>
                    </Col>
                  </Row>
                </div>
              </Container>
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
            {/* 1st Hero Variation */}
          </div>
          
          <section className="section section-lg">
            <Container>
              <Row className="row-grid align-items-center">
                <Col className="order-md-2" md="6">
                  <img
                    alt="..."
                    className="img-fluid floating"
                    src={require("assets/img/theme/promo-1.png")}
                  />
                </Col>
                <Col className="order-md-1" md="6">
                  <div className="pr-md-5">
                    <div className="icon icon-lg icon-shape icon-shape-success shadow rounded-circle mb-5">
                      <i className="ni ni-settings-gear-65" />
                    </div>
                    <h3>Awesome features</h3>
                    <p>
                    Web3Locker aims towards making it convenient and secure for users to store and share documents
                    </p>
                    <ul className="list-unstyled mt-5">
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-planet" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0">
                            Uses the decentralized platform which makes storing and accessing files faster.
                            </h6>
                          </div>
                        </div>
                      </li>
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-html5" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0 py-3">Documents are verified to prevent any forgery or different files from being shared that are not associated to the original account.</h6>
                          </div>
                        </div>
                      </li>
                      {/*  */}
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-check-bold" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0 py-3">Polygon ID applies zero-knowledge native protocols for ultimate user privacy.</h6>
                          </div>
                        </div>
                      </li>

                      {/*  */}
                      <li className="py-2">
                        <div className="d-flex align-items-center">
                          <div>
                            <Badge
                              className="badge-circle mr-3"
                              color="success"
                            >
                              <i className="ni ni-badge" />
                            </Badge>
                          </div>
                          <div>
                            <h6 className="mb-0">
                              Maintain control over information shared and your digital identity.
                            </h6>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>                 
          <section className="section pb-8 bg-gradient-warning">
            <Container>
              <Row className="row-grid align-items-center">
                <Col className="order-lg-2 ml-lg-auto" md="6">
                  <div className="position-relative pl-md-5">
                    <img
                      alt="..."
                      className="img-fluid floating"
                      src={require("assets/img/ill/ill-21.png")}
                    />
                  </div>
                </Col>
                <Col className="order-lg-1" lg="6">
                <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3 ">
                        <div>
                        <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                        <i className="ni ni-building text-primary" />
                      </div> 
                        </div>
                        <div className="pl-4">
                          <h5 className="title text-success">
                         The Arcana Network
                         </h5>
                         <p> More convenience to design and integrate the dApp is possible since it is powered by the Arcana Network, which offers total data protection and access control for user data. 
                         </p>
                          <a
                           className="text-success"
                           href="#pablo"
                           onClick={(e) => e.preventDefault()}
                        >
                          Learn more
                        </a>
                       </div>
                    </div>
                   </CardBody>
                 </Card>
                  {/* box 3 */}
               

                  <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3 ">
                        <div>
                        <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                        <i className="ni ni-trophy text-primary" />
                      </div> 
                        </div>
                        <div className="pl-4">
                          <h5 className="title text-success">
                         Login with Unstoppable Domains
                         </h5>
                         <p> Thanks to Unstoppable, users have control over login credentials and the developers can avoid hosting database of user information by requesting access when needed. 
                         </p>
                          <a
                           className="text-success"
                           href="#pablo"
                           onClick={(e) => e.preventDefault()}
                        >
                          Learn more
                        </a>
                       </div>
                    </div>
                   </CardBody>
                 </Card>

                 <Card className="shadow shadow-lg--hover mt-5">
                    <CardBody>
                      <div className="d-flex px-3 ">
                        <div>
                        <div className="icon icon-shape bg-gradient-warning rounded-circle text-white">
                        <i className="ni ni-key-25 text-primary" />
                      </div> 
                        </div>
                        <div className="pl-4">
                          <h5 className="title text-success">
                         Privacy with Polygon ID
                         </h5>
                         <p> Since Polygon ID is private, access control is based on proving verifiable information rather than sharing it with the verifier (Zero Knowledge concept).This ensures the Right of access to apps with user anonymity 
                         </p>
                          <a
                           className="text-success"
                           href="#pablo"
                           onClick={(e) => e.preventDefault()}
                        >
                          Learn more
                        </a>
                       </div>
                    </div>
                   </CardBody>
                 </Card>
                </Col>
              </Row>
            </Container>
            {/* SVG separator */}
            <div className="separator separator-bottom separator-skew zindex-100">
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
                  </main>
      </>
    );
  }
}

export default Landing;