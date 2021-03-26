import React , { useState } from "react";
import { Container, Button,Row, Col } from "react-bootstrap";
import "../../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import homeLogo from "../../Assets/computer.svg";
import sou from "../../Assets/icon.wav";
import Particle from "../Particle";
import {AnimatedSocialIcon} from 'react-animated-social-icons'
import Heading from "./Heading";
import Tilt from "react-parallax-tilt";
import pdf from "../../Assets/Ajay.pdf";


function Home() {


  const playSound = audioFile => {
    const likeAudio = new Audio(sou);
    
    likeAudio.play();
    
}
  return (
    <section>
      <Container fluid className="about-section">
      <Particle />
        <Container className="home-content">
          <Row>
          
            <Col md={7} className="home-header">
              <div style={{ padding: 50 , textAlign: "left" }}>
                <Heading/>
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
                    onMouseEnter={() => playSound(sou)}
                               
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
                    animationDuration={1}
                    onMouseEnter={() => playSound(sou)}
                    />
              </li>
              <li className="home-social-icons">
                    <AnimatedSocialIcon 
                    brandName="twitter"
                    width="3em" 
                    url="https://twitter.com/Ajay39396242?s=08"
                    animation="bounce"
                    hoverColor="black"
                    defaultColor="#D1D1D1" 
                    animationDuration={1}
                    onMouseEnter={() => playSound(sou)}
                    />
              </li>
              <li className="home-social-icons">
                    <AnimatedSocialIcon 
                    brandName="instagram"
                    width="3em" 
                    url="https://www.instagram.com/ajay__kum__ar_/"
                    animation="bounce"
                    hoverColor="black"
                    defaultColor="#D1D1D1" 
                    animationDuration={1}
                    onMouseEnter={() => playSound(sou)}/>
              </li>
            </ul>
          </Col>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
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

