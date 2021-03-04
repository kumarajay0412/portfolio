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
            <br />
            <br />
      
            A passionate Full Stack Software Developer Who wants to explore every teck stack 🚀 having an experience of building Web and Mobile applications with JavaScript / Reactjs / Nodejs / React Native and some other cool libraries and frameworks.
          </p>

      

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
