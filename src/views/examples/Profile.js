import React, { useState, useRef } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  NavItem,
  NavLink,
  Nav,
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
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";

// core components
import LoginNavbar from "components/Navbars/LoginNavbar.js";
import SimpleFooter from "components/Footers/SimpleFooter.js";
import DocumentCard from "components/DocumentCard";
import { FaShare, FaFileDownload } from "react-icons/fa";
import { HiDocument } from "react-icons/hi";

import Web3 from "web3";

import { StorageProvider } from "@arcana/storage";
import { AccessTypeEnum } from "@arcana/storage";

function Profile(props) {
  //STORAGE

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

  async function Download(did) {
    await init();
    await dAppStorageProvider.download(did);
    console.log("Downloaded",did);
  }
  //********************************************** */

  // const [uploadTotal, setUploadTotal] = useState();
  const [Files, setFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);

  const toggleNavs = (e, state, index) => {
    e.preventDefault();
    setToggleState(index);
  };

  const toggleModal = () => {
    setModalState(!modal);
  };

  const [state, setToggleState] = useState(1);
  const [modal, setModalState] = useState(false);
  const [ok, setOk] = useState(false);
  const [okShare, setOkShare] = useState(false);
  const [initialize, setInitialize] = useState(true);
  const [shareAddress, setShareAddress] = useState("");
  // setUploadList(StorageService.MyFiles().length);

  // var x;
  if (initialize) {
    init().then(async () => {
      // x = await StorageService.MyFiles();
      // console.log('Total Files',x);
      await MyFiles().then(() => {
        setOk(true);
        setInitialize(false);

        // console.log("Files - ",Files);
        // console.log("File Length", Files.length)
      });

      await SharedWithMe().then(() => {
        setOkShare(true);
      });
      // setSharedFiles(SharedWithMe());
      //   console.log("Shared Files", sharedFiles);
      // Add MyFiles() here.
      // console.log("Files - ",Files);
      // console.log("File Length", Files.length)
    });
  }

  const inputFilePropertyRef = useRef(null);
  // const [uploadList, setUploadList] = useState();

  // const EthList = await StorageService.MyFiles();

  // Total().then(value => console.log("ABCD",value));

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
                      <Button
                        className="float-left"
                        color="info"
                        href="/shared-with-me"
                        size="sm"
                      >
                        Shared with me
                      </Button>

                      <Button
                        className="float-left"
                        color="info"
                        // onClick={() => }
                        // {...setUploadList(StorageService.MyFiles().length)}
                        size="sm"
                      >
                        Fetch Files
                      </Button>
                    </div>
                  </Col>
                  <Col className="order-lg-1" lg="4">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <div>
                        <span className="heading">{Files.length}</span>
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

                        <TabContent activeTab={"iconTabs" + state}>
                          <TabPane tabId="iconTabs1">
                            <div className="mt-1 py-4 text-center">
                              <Row className="justify-content-center">
                                <Col lg="9">
                                  {Files.length > 0 && (
                                    <section>
                                      <Container>
                                        <Row className="justify-content-center">
                                          <Col lg="12">
                                            <Row className="row-grid">
                                              {ok &&
                                                Files.map((e, key) => (
                                                  <Col lg="6">
                                                    <br />
                                                    <br />
                                                    <Card
                                                      className="card-lift--hover shadow border-0"
                                                      key={key}
                                                      onClick={console.log(
                                                        "Hello"
                                                      )}
                                                    >
                                                      {/* <CardBody>
                                                  <h6>Contract Address</h6>
                                                  <a>
                                                    {nftList[key].token_address}
                                                  </a>
                                                  <h6>Name</h6>{" "}
                                                  <a>{nftList[key].name}</a>
                                                  <h6>Owner</h6>{" "}
                                                  <a>{nftList[key].owner_of}</a>
                                                </CardBody> */}
                                                      <CardBody>
                                                        {/* <span
                                                          style={{
                                                            float: "left",
                                                          }}
                                                        >
                                                          Doc1
                                                        </span> */}
                                                        <span>
                                                          {Files[key].did}
                                                        </span>
                                                        <span
                                                          className="options"
                                                          style={{
                                                            float: "right",
                                                          }}
                                                        >
                                                          {/* <a
                                                            href="#"
                                                            className="viewDoc"
                                                          >
                                                            <HiDocument />
                                                          </a>
                                                          &nbsp;&nbsp;&nbsp; */}
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
                                                              <FaShare />
                                                            </button>
                                                          </a>
                                                          {/* &nbsp;&nbsp;&nbsp;
                                                          <a
                                                            className="Download"
                                                            href="#"
                                                          >
                                                            <FaFileDownload />
                                                          </a> */}
                                                        </span>
                                                      </CardBody>
                                                      {/* Form Modal */}

                                                      <Button
                                                        block
                                                        color="default"
                                                        type="button"
                                                        className="mr-4"
                                                        onClick={toggleModal}
                                                      >
                                                        Share
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
                                                                  Set Address of
                                                                  the Receiver
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
                                                                        shareAddress
                                                                      }
                                                                      onChange={(
                                                                        e
                                                                      ) =>
                                                                        setShareAddress(
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
                                                                        shareAddress
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
                          <TabPane tabId="iconTabs2">
                            <div className="mt-1 py-4 text-center">
                              <Row className="justify-content-center">
                                <Col lg="9">
                                  {Files.length > 0 && (
                                    <section>
                                      <Container>
                                        <Row className="justify-content-center">
                                          <Col lg="12">
                                            <Row className="row-grid">
                                              {ok &&
                                                Files.map((e, key) => (
                                                  <Col lg="6">
                                                    <br />
                                                    <br />
                                                    <Card
                                                      className="card-lift--hover shadow border-0"
                                                      onClick={console.log(
                                                        Files[key]
                                                      )}
                                                    >
                                                      <CardBody>
                                                        <span
                                                          style={{
                                                            float: "left",
                                                          }}
                                                        >
                                                          Doc1
                                                        </span>
                                                        <span>
                                                          {Files[key].did}
                                                        </span>
                                                        <span
                                                          className="options"
                                                          style={{
                                                            float: "right",
                                                          }}
                                                        >
                                                          <a
                                                            href="#"
                                                            className="viewDoc"
                                                          >
                                                            <HiDocument />
                                                          </a>
                                                          &nbsp;&nbsp;&nbsp;
                                                          <a
                                                            className="Share"
                                                            href="#"
                                                          >
                                                            <FaShare />
                                                          </a>
                                                          &nbsp;&nbsp;&nbsp;
                                                          <a
                                                            className="Download"
                                                            href="#"
                                                          >
                                                            <FaFileDownload />
                                                          </a>
                                                        </span>
                                                      </CardBody>

                                                      {Files[key].did && (
                                                        <Button
                                                          block
                                                          color="default"
                                                          type="button"
                                                          className="mr-4"
                                                          onClick={() =>
                                                            console.log("xyz")
                                                          }
                                                        >
                                                          Reject Fetch Request
                                                        </Button>
                                                      )}
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
                          <TabPane tabId="iconTabs3">
                            <div className="mt-1 py-4 text-center">
                              <Row className="justify-content-center">
                                <Col lg="9">
                                  {Files.length > 0 && (
                                    <section>
                                      <Container>
                                        <Row className="justify-content-center">
                                          <Col lg="12">
                                            <Row className="row-grid">
                                              {ok &&
                                                Files.map((e, key) => (
                                                  <Col lg="6">
                                                    <br />
                                                    <br />
                                                    <Card
                                                      className="card-lift--hover shadow border-0"
                                                      onClick={console.log(
                                                        Files[key].did
                                                      )}
                                                    >
                                                      <CardBody>
                                                        <span
                                                          style={{
                                                            float: "left",
                                                          }}
                                                        >
                                                          Doc1
                                                        </span>
                                                        <span>
                                                          {Files[key].did}
                                                        </span>
                                                        <span
                                                          className="options"
                                                          style={{
                                                            float: "right",
                                                          }}
                                                        >
                                                          <a
                                                            href="#"
                                                            className="viewDoc"
                                                          >
                                                            <HiDocument />
                                                          </a>
                                                          &nbsp;&nbsp;&nbsp;
                                                          <a
                                                            className="Share"
                                                            href="#"
                                                          >
                                                            <FaShare />
                                                          </a>
                                                          &nbsp;&nbsp;&nbsp;
                                                          <a
                                                            className="Download"
                                                            href="#"
                                                          >
                                                            <FaFileDownload />
                                                          </a>
                                                        </span>
                                                      </CardBody>
                                                      {!Files[key].did && (
                                                        <Button
                                                          block
                                                          color="default"
                                                          type="button"
                                                          className="mr-4"
                                                          onClick={() =>
                                                            console.log(
                                                              "Clicked"
                                                            )
                                                          }
                                                        >
                                                          Init Fetch Request
                                                        </Button>
                                                      )}

                                                      {Files[key].did && (
                                                        <Button
                                                          block
                                                          color="default"
                                                          type="button"
                                                          className="mr-4"
                                                          onClick={() =>
                                                            console.log("abc")
                                                          }
                                                        >
                                                          Claim NFT
                                                        </Button>
                                                      )}
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
                      </p>
                    </Col>

                    <Col lg="9">
                      <span>Shared With Me</span>
                      <p>
                        <br></br>
                        {/* <span>INSERT CARDS HERE</span> */}
                        {/* <DocumentCard/> */}

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
                                              {ok &&
                                                sharedFiles.map((e, key) => (
                                                  <Col lg="6">
                                                    <br />
                                                    <br />
                                                    <Card
                                                      className="card-lift--hover shadow border-0"
                                                      key={key}
                                                      onClick={console.log(
                                                        "Hello"
                                                      )}
                                                    >
                                                      {/* <CardBody>
                                                  <h6>Contract Address</h6>
                                                  <a>
                                                    {nftList[key].token_address}
                                                  </a>
                                                  <h6>Name</h6>{" "}
                                                  <a>{nftList[key].name}</a>
                                                  <h6>Owner</h6>{" "}
                                                  <a>{nftList[key].owner_of}</a>
                                                </CardBody> */}
                                                      <CardBody>
                                                        {/* <span
                                                          style={{
                                                            float: "left",
                                                          }}
                                                        >
                                                          Doc1
                                                        </span> */}
                                                        <span>
                                                          {sharedFiles[key].did}
                                                        </span>
                                                        <span
                                                          className="options"
                                                          style={{
                                                            float: "right",
                                                          }}
                                                        >
                                                          {/* <a
                                                            href="#"
                                                            className="viewDoc"
                                                          >
                                                            <HiDocument />
                                                          </a>
                                                          &nbsp;&nbsp;&nbsp; */}
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
                                                          {/* &nbsp;&nbsp;&nbsp;
                                                          <a
                                                            className="Download"
                                                            href="#"
                                                          >
                                                            <FaFileDownload />
                                                          </a> */}
                                                        </span>
                                                      </CardBody>
                                                      {/* Form Modal */}

                                                      <Button
                                                        block
                                                        color="default"
                                                        type="button"
                                                        className="mr-4"
                                                        onClick={()=>Download(sharedFiles[key].did)}
                                                      >
                                                        Download
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
                                                                  Set Address of
                                                                  the Receiver
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
                                                                      // value={
                                                                      //   shareAddress
                                                                      // }
                                                                      onChange={(
                                                                        e
                                                                      ) =>
                                                                        SharedWithMe()
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
                                                                        shareAddress
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
                          <TabPane tabId="iconTabs2">
                            <div className="mt-1 py-4 text-center">
                              <Row className="justify-content-center">
                                <Col lg="9">
                                  {sharedFiles.length > 0 && (
                                    <section>
                                      <Container>
                                        <Row className="justify-content-center">
                                          <Col lg="12">
                                            <Row className="row-grid">
                                              {ok &&
                                                sharedFiles.map((e, key) => (
                                                  <Col lg="6">
                                                    <br />
                                                    <br />
                                                    <Card
                                                      className="card-lift--hover shadow border-0"
                                                      onClick={console.log(
                                                        sharedFiles[key]
                                                      )}
                                                    >
                                                      <CardBody>
                                                        <span
                                                          style={{
                                                            float: "left",
                                                          }}
                                                        >
                                                          Doc1
                                                        </span>
                                                        <span>
                                                          {sharedFiles[key].did}
                                                        </span>
                                                        <span
                                                          className="options"
                                                          style={{
                                                            float: "right",
                                                          }}
                                                        >
                                                          <a
                                                            href="#"
                                                            className="viewDoc"
                                                          >
                                                            <HiDocument />
                                                          </a>
                                                          &nbsp;&nbsp;&nbsp;
                                                          <a
                                                            className="Share"
                                                            href="#"
                                                          >
                                                            <FaShare />
                                                          </a>
                                                          &nbsp;&nbsp;&nbsp;
                                                          <a
                                                            className="Download"
                                                            href="#"
                                                          >
                                                            <FaFileDownload />
                                                          </a>
                                                        </span>
                                                      </CardBody>

                                                      {sharedFiles[key].did && (
                                                        <Button
                                                          block
                                                          color="default"
                                                          type="button"
                                                          className="mr-4"
                                                          onClick={() =>
                                                            console.log("xyz")
                                                          }
                                                        >
                                                          Reject Fetch Request
                                                        </Button>
                                                      )}
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
                          <TabPane tabId="iconTabs3">
                            <div className="mt-1 py-4 text-center">
                              <Row className="justify-content-center">
                                <Col lg="9">
                                  {sharedFiles.length > 0 && (
                                    <section>
                                      <Container>
                                        <Row className="justify-content-center">
                                          <Col lg="12">
                                            <Row className="row-grid">
                                              {ok &&
                                                sharedFiles.map((e, key) => (
                                                  <Col lg="6">
                                                    <br />
                                                    <br />
                                                    <Card
                                                      className="card-lift--hover shadow border-0"
                                                      onClick={console.log(
                                                        sharedFiles[key].did
                                                      )}
                                                    >
                                                      <CardBody>
                                                        <span
                                                          style={{
                                                            float: "left",
                                                          }}
                                                        >
                                                          Doc1
                                                        </span>
                                                        <span>
                                                          {sharedFiles[key].did}
                                                        </span>
                                                        <span
                                                          className="options"
                                                          style={{
                                                            float: "right",
                                                          }}
                                                        >
                                                          <a
                                                            href="#"
                                                            className="viewDoc"
                                                          >
                                                            <HiDocument />
                                                          </a>
                                                          &nbsp;&nbsp;&nbsp;
                                                          <a
                                                            className="Share"
                                                            href="#"
                                                          >
                                                            <FaShare />
                                                          </a>
                                                          &nbsp;&nbsp;&nbsp;
                                                          <a
                                                            className="Download"
                                                            href="#"
                                                          >
                                                            <FaFileDownload />
                                                          </a>
                                                        </span>
                                                      </CardBody>
                                                      {!sharedFiles[key]
                                                        .did && (
                                                        <Button
                                                          block
                                                          color="default"
                                                          type="button"
                                                          className="mr-4"
                                                          onClick={() =>
                                                            console.log(
                                                              "Clicked"
                                                            )
                                                          }
                                                        >
                                                          Init Fetch Request
                                                        </Button>
                                                      )}

                                                      {sharedFiles[key].did && (
                                                        <Button
                                                          block
                                                          color="default"
                                                          type="button"
                                                          className="mr-4"
                                                          onClick={() =>
                                                            console.log("abc")
                                                          }
                                                        >
                                                          Claim NFT
                                                        </Button>
                                                      )}
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
  );
}

export default Profile;
