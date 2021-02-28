import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import "../../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import myImg from "../../Assets/figure.png";
import "../../style.css";
import Tilt from "react-parallax-tilt";
import Aboutcard from "./AboutCard";
import Form from "./Form.js";


function About() {
  return (
    <Container fluid className="about-section" >
     
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px",paddingTop: "180px", paddingBottom: "150px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Know Who <strong className="purple">I'M</strong>
              
            </h1>
            <Aboutcard />
      
          </Col>
          <Col md={5} className="myAvtar"   >
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>

        <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "50px" , paddingRight: "100px"}}>
        <Col xs={6} md={4} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/wired/150/000000/python.png" className="img-fluid"/>

          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/ios-filled/150/000000/react-native.png"/>
          {/* <img src={IMG_2} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/windows/150/000000/js-squared.png"/>
          {/* <img src={IMG_3} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/ios/150/000000/c-plus-plus-logo.png"/>
          {/* <img src={IMG_4} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/ios-filled/150/000000/java-coffee-cup-logo--v1.png"/>
          {/* <img src={IMG_5} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/windows/150/000000/nodejs.png"/>
          {/* <img src={IMG_6} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/windows/150/000000/bootstrap.png"/>
          {/* <img src={IMG_7} className="img-fluid" alt="avatar" /> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/windows/150/000000/git-squared.png"/>
          {/* <img src={IMG_8} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/ios-filled/150/000000/adobe-logo.png"/>
          {/* <img src={IMG_9} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/ios/150/000000/postgreesql.png"/>
          {/* <img src={IMG_10} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
  

       
        </Row>
        <h1 className="project-heading">
          <strong className="purple">Tools</strong> I use
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "50px", paddingRight: "100px"} }>
        <Col xs={6} md={3} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/ios-filled/150/000000/visual-studio-logo.png"/>
          {/* <img src={IMG_21} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/wired/150/000000/postman-api.png"/>
          {/* <img src={IMG_22} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/material/150/000000/intellij-idea.png"/>
          {/* <img src={IMG_23} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/windows/150/000000/pycharm.png"/>
          {/* <img src={IMG_25} className="img-fluid" alt="avatar" /> */}

          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1">
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/ios-glyphs/150/000000/github.png"/>
          {/* <Icon icon={netlifyIcon} style={{ justifyContent: "center", paddingBottom: "50px" }} /> */}
          {/* <img src={IMG_25} className="img-fluid" alt="avatar" /> */}

          </div>
          </div>
      </Col>
        </Row>
              </Container>
              <Row style={{ justifyContent: "center"}}>
              <Form/>
              </Row>
    </Container>
  );
}

export default About;