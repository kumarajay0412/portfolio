import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import homeLogo from "../../Assets/computer.svg";
import Particle from "../Particle";
import myImg from "../../Assets/figure.png";
import Type1 from "./Type1";
import Tilt from "react-parallax-tilt";

function Home() {
  return (
    <section>
      <Container fluid className="about-section">
    
        <Container className="home-content">
          
          <Row>
          <Particle/>
            <Col md={7} className="home-header">
              <div style={{ padding: 50 , textAlign: "left" }}>
                <Type1 />
              </div>
            </Col>

            <Col md={5} className="myAvtar" >
            <Tilt>           
              <img src={homeLogo} alt="home pic" className="img-fluid" />
              </Tilt>
            </Col>
          
          </Row>
        </Container>
        <Row>
          <Col md={12} className="home-about-social">
      
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/kumarajay0412"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <i className="fab fa-github"></i>
                </a>
              </li>
            
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/ajay-kumar-a5bb4b193//"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/ajay__kum__ar_//"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <br>
      </br>
      <br>
      </br>
    </section>
  );
}

export default Home;
