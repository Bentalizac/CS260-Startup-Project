let sessionInfo = {username: "", score: 0, userRGB: [0, 0, 0], actualRGB: [0, 0, 0]};

console.log("Running Node.js");



async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    const response = await fetch(`/existingUser?${params.toString()}`);
    const data = await response.json();

    if (data.status === "Success") {
      alert("Login successful!");

      // Set a cookie to keep track of the login status
      document.cookie = `loggedIn=true; path=/`;

      // Hide the login and registration buttons
      const loginButton = document.getElementById("loginButton");
      loginButton.style.display = "none";

      const registerButton = document.getElementById("registerButton");
      registerButton.style.display = "none";

      // Show the play and logout buttons
      const playButton = document.getElementById("playButton");
      playButton.style.display = "inline-block";

      const logoutButton = document.getElementById("logoutButton");
      logoutButton.style.display = "inline-block";

    } else {
      alert("Not authorized");
    }
  } catch (error) {
    console.error(error);
    alert("Error logging in");
  }
}
async function start() {
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