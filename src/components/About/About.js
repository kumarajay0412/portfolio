import React from "react";
import { Container, Button,Row, Col } from "react-bootstrap";
import "../../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import myImg from "../../Assets/figure1.png";
import Tilt from "react-parallax-tilt";
import Aboutcard from "./AboutCard";
import beep1 from "../../Assets/beep/beep1.wav";
import beep2 from "../../Assets/beep/beep2.wav";
import beep3 from "../../Assets/beep/beep3.wav";
import beep4 from "../../Assets/beep/beep4.wav";
import beep5 from "../../Assets/beep/beep5.wav";
import beep6 from "../../Assets/beep/beep6.wav";
import beep7 from "../../Assets/beep/beep7.wav";
import beep8 from "../../Assets/beep/beep8.wav";
import beep9 from "../../Assets/beep/beep9.wav";
import beep10 from "../../Assets/beep/beep10.wav";
import beep11 from "../../Assets/beep/beep11.wav";
import beep12 from "../../Assets/beep/beep12.wav";
import beep13 from "../../Assets/beep/beep13.wav";
import beep14 from "../../Assets/beep/beep14.wav";
import beep15 from "../../Assets/beep/beep15.wav";
import pdf from "../../Assets/Ajay.pdf";
import { Link } from "react-router-dom";

function About() {

const playSound1 = audioFile => {
  const likeAudio = new Audio(beep1);
  likeAudio.play();
}

const playSound2 = audioFile => {
const likeAudio = new Audio(beep2);
likeAudio.play();
}
const playSound3 = audioFile => {
const likeAudio = new Audio(beep3);
likeAudio.play();
}

const playSound4 = audioFile => {
const likeAudio = new Audio(beep4);
likeAudio.play();
}
const playSound5 = audioFile => {
const likeAudio = new Audio(beep5);
likeAudio.play();
}

const playSound6 = audioFile => {
const likeAudio = new Audio(beep6);
likeAudio.play();
}

const playSound7 = audioFile => {
const likeAudio = new Audio(beep7);
likeAudio.play();
}
const playSound8 = audioFile => {
const likeAudio = new Audio(beep8);
likeAudio.play();
}
const playSound9 = audioFile => {
const likeAudio = new Audio(beep9);
likeAudio.play();
}
const playSound10 = audioFile => {
const likeAudio = new Audio(beep10);
likeAudio.play();
}
  const playSound11 = audioFile => {
    const likeAudio = new Audio(beep11);
    likeAudio.play();
    }
    const playSound12 = audioFile => {
      const likeAudio = new Audio(beep12);
      likeAudio.play();
      }
      const playSound13 = audioFile => {
        const likeAudio = new Audio(beep13);
        likeAudio.play();
        }
        const playSound14 = audioFile => {
          const likeAudio = new Audio(beep14);
          likeAudio.play();
          }
          const playSound15 = audioFile => {
            const likeAudio = new Audio(beep15);
            likeAudio.play();
            }

  return (
    <Container fluid className="about-section" >
     
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px",paddingTop: "180px", paddingBottom: "30px" }}>
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
            {/* <Tilt> */}
              <img src={myImg} className="img-fluid" alt="avatar" />
            {/* </Tilt> */}
          </Col>
        </Row>
        <Row style={{ justifyContent: "center", position: "relative",paddingBottom: "100px" }}>
          <Col>
          <Link to="/contactme">
          <Button variant="primary"  target="_blank">
            <img src="https://img.icons8.com/android/22/000000/phone-disconnected.png"/>Contact me
          </Button>
          </Link>
          </Col>
          <Col>
          <Button variant="primary" href={pdf} target="_blank">
          <img src="https://img.icons8.com/pastel-glyph/24/000000/download--v1.png"/> Download Resume
          </Button>
          </Col>
         
         
        </Row>

        <h1 className="project-heading">
          Professional <strong className="purple">Skillset </strong>
        </h1>
        <Row style={{ justifyContent: "center", paddingBottom: "50px" , paddingRight: "100px"}}>
        <Col xs={6} md={4} >
        <div class="wrapper1"  onMouseEnter={() => playSound1(beep1)}>
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/wired/150/000000/python.png" className="img-fluid"/>
         
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1" onMouseEnter={() => playSound2(beep2)}>
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/ios-filled/150/000000/react-native.png"/>
          {/* <img src={IMG_2} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1" onMouseEnter={() => playSound3(beep3)}>
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/windows/150/000000/js-squared.png"/>
          {/* <img src={IMG_3} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1" onMouseEnter={() => playSound4(beep4)}>
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/ios/150/000000/c-plus-plus-logo.png"/>
          {/* <img src={IMG_4} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1" onMouseEnter={() => playSound5(beep5)}>
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/ios-filled/150/000000/java-coffee-cup-logo--v1.png"/>
          {/* <img src={IMG_5} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1" onMouseEnter={() => playSound6(beep6)}>
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/windows/150/000000/nodejs.png"/>
          {/* <img src={IMG_6} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1"onMouseEnter={() => playSound7(beep7)}>
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/windows/150/000000/bootstrap.png"/>
          {/* <img src={IMG_7} className="img-fluid" alt="avatar" /> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1"onMouseEnter={() => playSound8(beep8)}>
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/windows/150/000000/git-squared.png"/>
          {/* <img src={IMG_8} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1"onMouseEnter={() => playSound9(beep9)}>
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/ios-filled/150/000000/adobe-logo.png"/>
          {/* <img src={IMG_9} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={5} md={3} >
        <div class="wrapper1" onMouseEnter={() => playSound10(beep10)}>
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
        <div class="wrapper1" onMouseEnter={() => playSound11(beep11)}>
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/ios-filled/150/000000/visual-studio-logo.png"/>
          {/* <img src={IMG_21} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1" onMouseEnter={() => playSound12(beep12)}>
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/wired/150/000000/postman-api.png"/>
          {/* <img src={IMG_22} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1" onMouseEnter={() => playSound13(beep13)} >
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/material/150/000000/intellij-idea.png"/>
          {/* <img src={IMG_23} className="img-fluid" alt="avatar" /> */}
          {/* <i className={`${prop.iconName} tech-icon-images`}></i> */}
          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1" onMouseEnter={() => playSound14(beep14)}>
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/windows/150/000000/pycharm.png"/>
          {/* <img src={IMG_25} className="img-fluid" alt="avatar" /> */}

          </div>
          </div>
      </Col>
      <Col xs={6} md={3} >
        <div class="wrapper1"onMouseEnter={() => playSound15(beep15)} >
          <div class="container1" id="c01">
          <img src="https://img.icons8.com/ios-glyphs/150/000000/github.png"/>
          {/* <Icon icon={netlifyIcon} style={{ justifyContent: "center", paddingBottom: "50px" }} /> */}
          {/* <img src={IMG_25} className="img-fluid" alt="avatar" /> */}

          </div>
          </div>
      </Col>
        </Row>
       
              </Container>
              {/* <Row style={{ justifyContent: "center"}}>
              <Form/>
              </Row> */}
              {/* <Three/> */}

              
    </Container>
  );
}

export default About;