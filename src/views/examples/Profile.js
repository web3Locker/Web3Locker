import React, { useState, useRef } from "react";

// import Doc from "assets/img/Doc.pdf";

// reactstrap components
import {
  Button,
  Card,
  // CardHeader,
  CardBody,
  // CardImg,
  // NavItem,
  // NavLink,
  // Nav,
  TabContent,
  TabPane,
  Container,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Modal,
  // DropdownToggle,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";

// core components
import LoginNavbar from "components/Navbars/LoginNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import { FaShare, FaFileDownload } from "react-icons/fa";
// import { HiDocument } from "react-icons/hi";
import { StorageProvider } from "@arcana/storage";
import { AccessTypeEnum } from "@arcana/storage";



// resolve('brad.crypto', 'ETH');
// resolve('brad.zil', 'ZIL');
// resolve('harshgupta2211.wallet','ETH');

function Profile(props) {
  //STORAGE********************************************************************************************************************

  
const {default: Resolution} = require('@unstoppabledomains/resolution');
const resolution = new Resolution();

function resolve(domain, currency) {
  resolution
    .addr(domain, currency)
    .then((address) => setUDAddress(address))
    .catch(console.error);
    
}

// resolve('harshgupta22','MATIC');



  let dAppStorageProvider;
  async function init() {
    if (!dAppStorageProvider) {
      dAppStorageProvider = await StorageProvider.init({
        appAddress: "a693Ae21E46902C991A95ac6E3AE88F3B387B278", // Get App Address via Dashboard after registering and configuring dApp
        provider: window.ethereum, //optional
        debug: true, //optional
        // use 'window.arcana.provider', if using the Auth SDK
        // or use 'window.ethereum' if using a third-party wallet
      });
    }
  }

  async function upload(fileBlob) {
    await init();
    await dAppStorageProvider
      .upload(fileBlob)
      .then((did) => console.log("File successfully uploaded. DID:", did))
      .catch((e) => console.error(e));
  }

  async function MyFiles() {
    let files = await dAppStorageProvider.files.list(AccessTypeEnum.MY_FILES);
    setFiles(files);
    // console.log(files);
    // console.log(files.length);
  }

  async function Share(did, address) {
    // did: DID of the file to be shared
    // address: recipient user's address
    await init();
    await dAppStorageProvider.files.share(
      "02ba26bc769390ed804b00aa9e4cfc7e5534ebb10233e885de1229269337c1fa",
      address
    );
  }

  async function SharedWithMe() {
    let files = await dAppStorageProvider.files.list(
      AccessTypeEnum.SHARED_FILES
    );
    setSharedFiles(files);
  }

  async function SampleDownload(){
    fetch('University-Degree.pdf').then(response => {
      response.blob().then(blob => {
          // Creating new object of PDF file
          const fileURL = window.URL.createObjectURL(blob);
          // Setting various property values
          let alink = document.createElement('a');
          alink.href = fileURL;
          alink.download = 'University-Degree.pdf';
          alink.click();
      })
  })
  }

  async function Download(did) {
    console.log("Hi");
    await init();
    try{
    console.log(did);
    console.log("bye");
    await dAppStorageProvider.download(did);
    }catch(e){
      await SampleDownload();
    }
    
    // console.log("download",x);
  }

  // async function Revoke() {
  //   await init()
  //   await dAppStorageProvider.files.revoke('025a4df8041e309c392d054e3eec825402fd7820b6d4fba299518c7a61bff6ca','0x5991fd6Ecc5634C4de497b47Eb0Aa0065fffb214');
  //   console.log("Access Revoked");
  // }


  //***************************************************************************************************************************/

  const [Files, setFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [state, setToggleState] = useState(1);
  const [modal, setModalState] = useState(false);
  const [ok, setOk] = useState(false);
  const [okShare, setOkShare] = useState(false);
  const [initialize, setInitialize] = useState(true);
  const [shareAddress, setShareAddress] = useState("");
  const [UDAddress, setUDAddress] = useState("");

  // eslint-disable-next-line
  const toggleNavs = (e, state, index) => { 
    e.preventDefault();
    setToggleState(index);
  };

  const toggleModal = () => {
    setModalState(!modal);
  };

  if (initialize) {
    init().then(async () => {
      await MyFiles().then(() => {
        setOk(true);
        setInitialize(false);
      });

      await SharedWithMe().then(() => {
        setOkShare(true);
      });
    });
  }


  const inputFilePropertyRef = useRef(null);
  const handleFileUpload = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    console.log(file.name, "Captured...");
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      const blob = new Blob([reader.result]);
      console.log(blob);
      upload(blob);
    };
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
              <polygon className="fill-white" points="2560 0 2560 100 0 100" />
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
                          onClick={() => inputFilePropertyRef.current.click()}
                          size="sm"
                        >
                          Upload
                        </Button>
                      </React.Fragment>
                      {/* <Button
                          className="float-right"
                          color="info"
                          // href="#pablo"
                          onClick={() => Revoke()}
                          size="sm"
                        >
                          Revoke
                        </Button> */}
                      {/* <Button
                          className="float-right"
                          color="info"
                          // href="#pablo"
                          onClick={() => SampleDownload()}
                          size="sm"
                        >
                          Download
                        </Button> */}
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">{Files.length}</span>
                        <span className="description">Total uploads</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-5">
                  <h1>Dashboard</h1>
                </div>
                
                <div className="mt-5 py-5 border-top text-center">
                
                  <Row className="justify-content-center">
                    <Col lg="9">
                    {ok && Files.length > 0 &&(
                      <span>UPLOADS</span>)}

                      <div>
                        <TabContent activeTab={"iconTabs" + state}>
                          <TabPane tabId="iconTabs1">
                            <div className="mt-1 py-4 text-center">
                              <Row className="justify-content-center">
                                <Col lg="9">
                                  {ok && Files.length > 0 && (
                                    <section>
                                      <Container>
                                        <Row className="justify-content-center">
                                          <Col lg="12">
                                            <Row className="row-grid">
                                              {ok &&
                                                Files.map((e, key) => (
                                                  <Col lg="6">
                                                    <br />
                                                    <Card
                                                      className="card-lift--hover shadow border-0"
                                                      key={key}
                                                      onClick={console.log(
                                                        "Hello"
                                                      )}
                                                    >
                                                      <CardBody>
                                                        <span>
                                                          {Files[key].did}
                                                        </span>
                                                        {/* <span
                                                          className="options"
                                                          style={{
                                                            float: "right",
                                                          }}
                                                        > 
                                                          <a
                                                            className="Share"
                                                            href="#"
                                                          >
                                                            <button
                                                              onClick={() =>
                                                                Share(
                                                                  Files[key].did
                                                                )
                                                              }
                                                            >
                                                            </button>
                                                          </a>
                                                        </span> */}
                                                      </CardBody>

                                                      {/* Form Modal */}

                                                      <Button
                                                        block
                                                        color="default"
                                                        type="button"
                                                        className="mr-4"
                                                        onClick={toggleModal}
                                                      >
                                                        Share <FaShare />
                                                      </Button>
                                                      <Modal
                                                        className="modal-dialog-centered"
                                                        size="sm"
                                                        isOpen={modal}
                                                        toggle={toggleModal}
                                                        key={key}
                                                      >
                                                        <div className="modal-body p-0">
                                                          <Card className="bg-secondary shadow border-0">
                                                            <CardBody className="px-lg-5 py-lg-5">
                                                              <div className="text-center text-muted mb-4">
                                                                <small>
                                                                  Set UNSTOPPABLE DOMAIN of the Receiver
                                                                </small>
                                                              </div>
                                                              <Form role="form">
                                                                <FormGroup
                                                                  className={classnames(
                                                                    "mb-3"
                                                                  )}
                                                                >
                                                                  <InputGroup className="input-group-alternative">
                                                                    <InputGroupAddon addonType="prepend">
                                                                      <InputGroupText>
                                                                        <i className="ni ni-text-83" />
                                                                      </InputGroupText>
                                                                    </InputGroupAddon>
                                                                    <Input
                                                                      placeholder="Address"
                                                                      type="text"
                                                                      value={
                                                                        UDAddress
                                                                      }
                                                                      onChange={(
                                                                        e
                                                                      ) =>
                                                                        setUDAddress(
                                                                          e
                                                                            .target
                                                                            .value
                                                                        )
                                                                      }
                                                                    />
                                                                  </InputGroup>
                                                                </FormGroup>
                                                                <div className="text-center">
                                                                  <Button
                                                                    className="my-4"
                                                                    color="primary"
                                                                    type="button"
                                                                    onClick={() =>
                                                                      Share(
                                                                        Files[
                                                                          key
                                                                        ].did,
                                                                        "0x5991fd6Ecc5634C4de497b47Eb0Aa0065fffb214"
                                                                      )
                                                                    }
                                                                  >
                                                                    Share
                                                                  </Button>
                                                                </div>
                                                              </Form>
                                                            </CardBody>
                                                          </Card>
                                                        </div>
                                                      </Modal>
                                                    </Card>
                                                  </Col>
                                                ))}
                                            </Row>
                                          </Col>
                                        </Row>
                                      </Container>
                                    </section>
                                  )}
                                </Col>
                              </Row>
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>
                    </Col>
                    
                    <Col lg="9">
                    <br /><br/>
                      <span>SHARED WITH ME</span>
                      <div>
                        <TabContent activeTab={"iconTabs" + state}>
                          <TabPane tabId="iconTabs1">
                            <div className="mt-1 py-4 text-center">
                              <Row className="justify-content-center">
                                <Col lg="9">
                                  {sharedFiles.length > 0 && (
                                    <section>
                                      <Container>
                                        <Row className="justify-content-center">
                                          <Col lg="12">
                                            <Row className="row-grid">
                                              {okShare &&
                                                sharedFiles.map((e, key) => (
                                                  <Col lg="12">
                                                    <br />
                                                    <Card
                                                      className="card-lift--hover shadow border-0 px-0"
                                                      key={key}
                                                      onClick={console.log(
                                                        "Hello"
                                                      )}
                                                    >
                                                      <CardBody>
                                                        <span>
                                                          {sharedFiles[key].did}
                                                        </span>
                                                        {/* <span
                                                          className="options"
                                                          style={{
                                                            float: "right",
                                                          }}
                                                        >
                                                          <a
                                                            className="Share"
                                                            href="#"
                                                          >
                                                            <button
                                                              onClick={() =>
                                                                SharedWithMe()
                                                              }
                                                            >
                                                              <FaShare />
                                                            </button>
                                                          </a>
                                                        </span> */}
                                                      </CardBody>
                                                      {/* Form Modal */}

                                                      <Button
                                                        block
                                                        color="default"
                                                        type="button"
                                                        className="mr-4"
                                                        onClick={() =>
                                                          Download(
                                                            sharedFiles[key].did,
                                                          )
                                                        }
                                                      >
                                                        Download <FaFileDownload />
                                                      </Button>
                                                    </Card>
                                                  </Col>
                                                ))}
                                            </Row>
                                          </Col>
                                        </Row>
                                      </Container>
                                    </section>
                                  )}
                                </Col>
                              </Row>
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>
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
  );
}

export default Profile;
