// Retrieve the stored sessionInfo object from localStorage
const storedSessionInfo = JSON.parse(localStorage.getItem("sessionInfo"));

// Use the stored sessionInfo object
console.log(storedSessionInfo.username); // Output: BEEE
console.log(storedSessionInfo[0]); // Output: {red: 0, green: 0, blue: 0}
console.log(storedSessionInfo[1]); // Output: {red: 0, green: 0, blue: 0}
console.log(storedSessionInfo[2]); // Output: {username: "BEEE"}
console.log(storedSessionInfo[3]); // Output: {score: 0}

let username = storedSessionInfo[2].username;
sessionInfo = storedSessionInfo;


document.getElementById("usernameHere").append(username);

  const redSubmit = document.getElementById("r_button");
  redSubmit.addEventListener("click", event => {
    event.preventDefault();
    const redVal = document.getElementById("r_value").value;
    sessionInfo[1].red = parseInt(redVal);
    console.log(sessionInfo[1].red)
  });

  const greenSubmit = document.getElementById("g_button");
  greenSubmit.addEventListener("click", event => {
    event.preventDefault();
    const greenVal = document.getElementById("g_value").value;
    sessionInfo[1].green = parseInt(greenVal);
    console.log(sessionInfo[1].green)
  });

  const blueSubmit = document.getElementById("b_button");
  blueSubmit.addEventListener("click", event => {
    event.preventDefault();
    const blueVal = document.getElementById("b_value").value;
    sessionInfo[1].blue = parseInt(blueVal);
    console.log(sessionInfo[1].blue)
  });


function generateRandomInteger(max) {
    return Math.floor(Math.random() * max) + 1;
  }
  
function setRGB() {

    function RandRGB() {
        return generateRandomInteger(255);
    }

    const red = RandRGB();
    const blue = RandRGB();
    const green = RandRGB();

    sessionInfo[0].red = red;
    sessionInfo[0].green = green;
    sessionInfo[0].blue = blue;

// get the color swatch element
const colorSwatch = document.getElementById("box");

// set the backgroundColor property to the new RGB values
colorSwatch.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

}
  function compareRGB() {
    const randRed = sessionInfo[0].red;
    const randGreen = sessionInfo[0].green;
    const randBlue = sessionInfo[0].blue;
  
    const userRed = sessionInfo[1].red;
    const userGreen = sessionInfo[1].green;
    const userBlue = sessionInfo[1].blue;
  
    const redDiff = Math.abs(randRed - userRed);
    const greenDiff = Math.abs(randGreen - userGreen);
    const blueDiff = Math.abs(randBlue - userBlue);
  
    const accuracy = ((255 - redDiff) / 255) * 0.3 + ((255 - greenDiff) / 255) * 0.59 + ((255 - blueDiff) / 255) * 0.11;
  
    return accuracy.toFixed(2);
  }
  
// STUFF FOR SCORES PAGE
async function scores() {

    const redVal = document.getElementById("r_value").value;
    sessionInfo[1].red = parseInt(redVal);
    console.log(sessionInfo[1].red)


    const greenVal = document.getElementById("g_value").value;
    sessionInfo[1].green = parseInt(greenVal);
    console.log(sessionInfo[1].green)

    const blueVal = document.getElementById("b_value").value;
    sessionInfo[1].blue = parseInt(blueVal);
    console.log(sessionInfo[1].blue)

    const accuracy = compareRGB();
    localStorage.setItem("score", accuracy);
    sessionInfo.score = accuracy;
    //sessionInfo[2].username = localStorage.getItem("userName");
    localStorage.setItem('sessionInfo', JSON.stringify(sessionInfo));

    fetch('/saveInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sessionInfo)
    })

    window.location.href = "scores.html";

}


