let sessionInfo = {username: "", score: 0, userRGB: [0, 0, 0], actualRGB: [0, 0, 0]};

console.log("Running Node.js");

async function login() {
  // Get the username from the input field
  let username = document.getElementById("username").value;
  console.log(username);

  // Update the sessionInfo object with the username
  sessionInfo.username = username;

  // Store the sessionInfo object in localStorage
  localStorage.setItem("sessionInfo", JSON.stringify(sessionInfo));

  debugger
  
  fetch('/saveInfo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {sessionInfo} )
  })
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  
  // Navigate to the play page
  window.location.href = "play.html";
}