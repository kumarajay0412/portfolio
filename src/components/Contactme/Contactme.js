import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./Form.js";

import myImg from "../../Assets/C1.svg";
import Tilt from "react-parallax-tilt";



function About() {
  return (
    <Container fluid className="about-section" > 
      <Container>
 
            <Row style={{  paddingTop:"-10px"}}>
                <Col md={4} style={{ justifyContent: "center", padding: "10px" }}>
                    <Form/>
                </Col>
                <Col  md={3} >
  
                </Col>
                <Col  md={5}  style={{ justifyContent: "center" , paddingTop :"150px"}}>
                <div>
                        <h2>Let's Chat</h2>
                        <br></br>
                        <p1 className="inp">Whether you have a question, want to start a project or simply want to connect.</p1>
                        <br></br>
                        <br></br>
                        <p1 className="inp">Feel free to send me a message in the contact form</p1>
                        <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
                </div>
                </Col>

              </Row>
              </Container>
           
    </Container>
  );
}

export default About;