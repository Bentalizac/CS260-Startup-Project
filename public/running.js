// Retrieve the stored sessionInfo object from localStorage
const storedSessionInfo = JSON.parse(localStorage.getItem("sessionInfo"));
console.log("ENTERED RUNNING>JS");
console.log(storedSessionInfo);
// Use the stored sessionInfo object
console.log(storedSessionInfo.username); // Output: BEEE
console.log(storedSessionInfo.actualRGB); // Output: {red: 0, green: 0, blue: 0}
console.log(storedSessionInfo.userRGB); // Output: {red: 0, green: 0, blue: 0}
console.log(storedSessionInfo.score); // Output: {username: "BEEE"}

let username = storedSessionInfo.username;
sessionInfo = storedSessionInfo;


document.getElementById("usernameHere").append(username);

  const redSubmit = document.getElementById("r_button");
  redSubmit.addEventListener("click", event => {
    event.preventDefault();
    const redVal = document.getElementById("r_value").value;
    sessionInfo.userRGB[0] = parseInt(redVal);
    console.log(sessionInfo.userRGB[0])
  });

  const greenSubmit = document.getElementById("g_button");
  greenSubmit.addEventListener("click", event => {
    event.preventDefault();
    const greenVal = document.getElementById("g_value").value;
    sessionInfo.userRGB[1] = parseInt(greenVal);
    console.log(sessionInfo.userRGB[1])
  });

  const blueSubmit = document.getElementById("b_button");
  blueSubmit.addEventListener("click", event => {
    event.preventDefault();
    const blueVal = document.getElementById("b_value").value;
    sessionInfo.userRGB[2]= parseInt(blueVal);
    console.log(sessionInfo.userRGB[2])
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

    sessionInfo.actualRGB[0] = red;
    sessionInfo.actualRGB[1] = green;
    sessionInfo.actualRGB[2] = blue;

// get the color swatch element
const colorSwatch = document.getElementById("box");

// set the backgroundColor property to the new RGB values
colorSwatch.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;

}
  function compareRGB() {
    const randRed = sessionInfo.actualRGB[0];
    const randGreen = sessionInfo.actualRGB[1];
    const randBlue = sessionInfo.actualRGB[2];
  
    const userRed = sessionInfo.userRGB[0];
    const userGreen = sessionInfo.userRGB[1];
    const userBlue = sessionInfo.userRGB[2];
  
    const redDiff = Math.abs(randRed - userRed);
    const greenDiff = Math.abs(randGreen - userGreen);
    const blueDiff = Math.abs(randBlue - userBlue);
  
    const accuracy = ((255 - redDiff) / 255) * 0.3 + ((255 - greenDiff) / 255) * 0.59 + ((255 - blueDiff) / 255) * 0.11;
  
    return accuracy.toFixed(2);
  }
  
// STUFF FOR SCORES PAGE
async function scores() {

    const redVal = document.getElementById("r_value").value;
    sessionInfo.userRGB[0] = parseInt(redVal);
    console.log(sessionInfo.userRGB[0])


    const greenVal = document.getElementById("g_value").value;
    sessionInfo.userRGB[1] = parseInt(greenVal);
    console.log(sessionInfo.userRGB[1])

    const blueVal = document.getElementById("b_value").value;
    sessionInfo.userRGB[2] = parseInt(blueVal);
    console.log(sessionInfo.userRGB[2])

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
      body: JSON.stringify({ sessionInfo })
    })

    window.location.href = "scores.html";

}


