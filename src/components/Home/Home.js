import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import homeLogo from "../../Assets/computer.svg";
import Particle from "../Particle";
import {AnimatedSocialIcon} from 'react-animated-social-icons'
import Type1 from "./Type1";
import Tilt from "react-parallax-tilt";
function Home() {
  return (
    <section>
      <Container fluid className="about-section">
        <Container className="home-content">
          <Row>
          {/* <Particle/> */}
            <Col md={7} className="home-header">
              <div style={{ padding: 50 , textAlign: "left" }}>
                <Type1 />
                <div>
                <hr className="line"/>
                </div>
              </div>
            </Col>
            <Col md={5}  >
            <Tilt>           
              <img src={homeLogo} alt="home pic" className="img-fluid" />
              </Tilt>
            </Col>
          </Row>
          <Row>
          <Col md={12} className="home-about-social">             
            <ul className="home-about-social-links">
              <li className="home-social-icons">
                <AnimatedSocialIcon
                    brandName="github"
                    url="https://github.com/kumarajay0412"
                    animation="bounce"
                    defaultColor="#D1D1D1"
                    hoverColor="black"
                    width="3em"
                    animationDuration={1}              
                    />
              </li>
              <li className="home-social-icons">
                      <AnimatedSocialIcon 
                    brandName="linkedin"
                    url="https://www.linkedin.com/in/ajay-kumar-a5bb4b193/"
                    animation="bounce"
                    defaultColor="#D1D1D1" 
                    hoverColor="black"
                    width="3em" 
                    animationDuration={1}/>
              </li>
              <li className="home-social-icons">
                    <AnimatedSocialIcon 
                    brandName="twitter"
                    width="3em" 
                    url="https://twitter.com/Ajay39396242?s=08"
                    animation="bounce"
                    hoverColor="black"
                    defaultColor="#D1D1D1" 
                    animationDuration={1}/>
              </li>
              <li className="home-social-icons">
                    <AnimatedSocialIcon 
                    brandName="instagram"
                    width="3em" 
                    url="https://www.instagram.com/ajay__kum__ar_/"
                    animation="bounce"
                    hoverColor="black"
                    defaultColor="#D1D1D1" 
                    animationDuration={1}/>
              </li>
            </ul>
          </Col>
        </Row>
        </Container>
        
      <br>
      </br>
      <br>
      </br>
      </Container>
    </section>
  );
}

export default Home;

