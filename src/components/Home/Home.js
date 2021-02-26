import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import homeLogo from "../../Assets/computer.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type1 from "./Type1";

function Home() {
  return (
    <section>
      <Container fluid className="area" id="home">
      <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
        <Particle/ >
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <div style={{ padding: 50 , textAlign: "left" }}>
                <Type1 />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img src={homeLogo} alt="home pic" className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
