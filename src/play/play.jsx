import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";

let username = localStorage.getItem('username');

const Play = ({ username, sessionInfo, addInfo, history }) => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get the user's RGB values from the state
    const userRGB = [red, green, blue];

    // Determine the score
    const actualRGB = [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
    ];
    const score =
      Math.abs(red - actualRGB[0]) +
      Math.abs(green - actualRGB[1]) +
      Math.abs(blue - actualRGB[2]);

    // Update the sessionInfo object with the user's RGB values and score
    sessionInfo.username = username;
    sessionInfo.userRGB = userRGB;
    sessionInfo.actualRGB = actualRGB;
    sessionInfo.score = score;

    // Update the database with the sessionInfo object
    addInfo(sessionInfo);

    // Move to the scores page
    history.push("/scores");
  };

  return (
    <Container className="bg-secondary text-center">
      <p></p>
      <h1>
        <p>
          Welcome <span id="usernameHere">{username}</span>! Displayed below is a color
          swatch,
        </p>{" "}
        your goal is to guess the RGB values of that color
      </h1>
      <div className="swatch">
        <div id="box"></div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>R Value:</Form.Label>
          <Form.Range
            min={0}
            max={255}
            value={red}
            onChange={(event) => setRed(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>G Value:</Form.Label>
          <Form.Range
            min={0}
            max={255}
            value={green}
            onChange={(event) => setGreen(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>B Value:</Form.Label>
          <Form.Range
            min={0}
            max={255}
            value={blue}
            onChange={(event) => setBlue(event.target.value)}
          />
        </Form.Group>
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </Form>
      <p>Click below to see your results!</p>
    </Container>
  );
};

export { Play };
