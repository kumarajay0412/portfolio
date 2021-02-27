import React from "react";
import "../style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Designed and Developed by Ajay kumar</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} AJ</h3>
        </Col>
        
      </Row>
    </Container>
  );
}

export default Footer;
