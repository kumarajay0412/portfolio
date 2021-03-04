import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "नमस्कार,मैं अजय हूँ",
          "Hi , I am Ajay",
          "Hola soy ajay",
          "Hallo, ich bin Ajay",
          "Salut, je suis Ajay",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
