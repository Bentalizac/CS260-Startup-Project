const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';
const saltRounds = 10; // number of rounds for password salting

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// Register a new user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Hash the password with bcrypt
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    await DB.addUser(username, hashedPassword);
    res.send('User registered successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Log in a user
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Get the user's hashed password from the database
    const user = await DB.getUser(username);
    if (!user) {
      // If the user doesn't exist, return an error message
      res.status(401).send('Invalid username or password');
      return;
    }

    // Compare the submitted password with the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // If the password doesn't match, return an error message
      res.status(401).send('Invalid username or password');
      return;
    }

    // Create an authentication token with a random value
    const authToken = Math.random().toString(36).substring(2);

    // Store the authentication token in the database
    await DB.addAuthToken(username, authToken);

    // Set the authentication token as an HTTP-only cookie
    setAuthCookie(res, authToken);

    // Return a success message
    res.send('Logged in successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Log out a user
app.post('/logout', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  if (!authToken) {
    // If the user is not authenticated, return an error message
    res.status(401).send('Unauthorized');
    return;
  }

  try {
    // Remove the authentication token from the database
    await DB.removeAuthToken(authToken);

    // Clear the authentication token cookie
    res.clearCookie(authCookieName);

    // Return a success message
    res.send('Logged out successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/sessionInfo/:username', async (req, res) => {
  const sessionInfo = await DB.getInfo(req.params.username);
  console.log(sessionInfo);
  res.send(sessionInfo);
});

app.get('/sessionInfo/:username', async (req, res) => {
  const sessionInfo = await DB.getInfo(req.params.username);
  console.log(sessionInfo);
  res.send(sessionInfo);
});

// Update sessionInfo
app.post('/saveInfo', async (req, res) => {
  const sessionInfo = req.body.sessionInfo;
  try {
    await DB.addInfo(sessionInfo);
    res.send('Session info saved successfully');
  } catch (err) {
    if (err.message.includes('ECONNREFUSED')) {
      // if connection refused, store in local storage
      localStorage.setItem('sessionInfo', JSON.stringify(sessionInfo));
      res.send('Session info saved to localStorage');
    } else {
      // otherwise, re-throw the error
      throw err;
    }
  }
});

app.get('/getInfo/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const result = await DB.getInfo(username);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/getAllInfo', async (req, res) => {
  try {
    const result = await DB.getAllInfo();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/input/:data', async (req, res, next) => {
  try {
    const result = await DB.addItem(req.params.data);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to add item' });
  }
});


// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
