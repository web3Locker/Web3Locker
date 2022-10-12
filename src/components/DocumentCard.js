import React from 'react'
import { Button, Card, Container, Row, Col, CardBody,CardImg,CardSubtitle,CardText,CardTitle } from "reactstrap";
import { Link } from "react-router-dom";
import {FaShare,FaFileDownload} from 'react-icons/fa';
import {HiDocument} from 'react-icons/hi'
function DocumentCard(props) {
  return (
    <>
    <div>
    <Container className="container-lg">
            <Row>
                <Row>
                <Card  className="card-lift--hover shadow border-0" style={{width:'50rem'}}>
                    <CardBody>
                    <span style={{float:'left'}}>Doc1</span>
                    <span className="options" style={{float:'right'}}>
                        <a href="#" className="viewDoc"><HiDocument/></a>&nbsp;&nbsp;&nbsp;
                        <a className='Share' href='#'><FaShare/></a>&nbsp;&nbsp;&nbsp;
                        <a className='Download' href='#'><FaFileDownload/></a>
                    </span>
                    </CardBody>
                </Card>
                </Row>
            </Row>
          </Container>
    </div>
    </>
  )
}

export default DocumentCard