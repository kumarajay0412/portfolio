import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import "../../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Tilt from "react-parallax-tilt";
import IMG_1 from "../../Assets/Projects/1.png";
import IMG_2 from "../../Assets/Projects/2.png";
import IMG_3 from "../../Assets/Projects/3.png";
import IMG_4 from "../../Assets/Projects/4.png";
import IMG_5 from "../../Assets/Projects/5.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
          <Tilt>
            <ProjectCard
              imgPath={IMG_1}
              isBlog={false}
              title="Color Switch Game"
              description="Implemented a version of the famous game color switch using JavaFX and Java."
              link="https://github.com/kumarajay0412/Color-switch-game"
            />
            </Tilt>
          </Col>

          <Col md={4} className="project-card">
          <Tilt>
            <ProjectCard
              imgPath={IMG_2}
              isBlog={false}
              title="Trshna"
              description="IoT device that connects to the water supply in your house and tracks water usage of different members in the house."
              link="https://sites.google.com/iiitd.ac.in/trsna/home?authuser=1"
            />
             </Tilt>
          </Col>

          <Col md={4} className="project-card">
          <Tilt>
            <ProjectCard
              imgPath={IMG_3}
              isBlog={false}
              title="Covid-19 india tracker"
              description="A web app for getting the covid patient in your locality based on your location IT using google API in react.
              "
              link="http://kumarajay0412.github.io/deploy/"
            />
          </Tilt>
          </Col>

          <Col md={4} className="project-card">
          <Tilt>
            <ProjectCard
              imgPath={IMG_4}
              isBlog={false}
              title="Boogeyman"
              description="Developed a game made on processing enviorment
              and using aurdino technology it was human interaction game which used many kind of sensors which gives input to control game movements"
              link="https://www.youtube.com/watch?v=MfDflAk9dPw&feature=youtu.be&ab_channel=AjayKumar"
            />
             </Tilt>
          </Col>
          <Col md={4} className="project-card">
          <Tilt>
            <ProjectCard
              imgPath={IMG_5}
              isBlog={false}
              title="Memories"
              description="Full Stack MERN Application that using React, Node.js, Express & MongoDB. The App is called Memories and it is a simple social media app that allows users to post interesting events that happened in their lives."
              link="https://github.com/kumarajay0412/Memories-MERN"
            />
             </Tilt>
          </Col>
        </Row>
        </Container>
    </Container>
  );
}

export default Projects;
