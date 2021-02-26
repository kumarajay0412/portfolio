import React from "react";
import Card from "react-bootstrap/Card";
import "../../style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Ajay kumar </span>
            from <span className="purple"> Delhi, India.</span>
            <br />I am a 2nd year student in Computer science and design Engeneering.
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <i className="far fa-hand-point-right"></i> Hanging out with friends 
            </li>
            <li className="about-activity">
              <i className="far fa-hand-point-right"></i> Drawing 
            </li>
            <li className="about-activity">
              <i className="far fa-hand-point-right"></i> Travelling
            </li>
          </ul>

          <p style={{ marginBlockEnd: 0, color: "rgb(155 126 172)" }}>
            "Going with the flow!"{" "}
          </p>
          <footer className="blockquote-footer">Ajay</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
