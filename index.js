const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);


app.get('/sessionInfo/:username', async (req, res) => {
  const sessionInfo = await DB.getInfo(req.params.username);
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

app.get('/getAllInfo', async (req, res) => {
  try {
  const sortedSessionInfoArray = await DB.getAllSessionsSortedByScore();
  res.json(sortedSessionInfoArray);
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
  }
  });

/*      /saveInfo fetch call
fetch('/saveInfo', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({sessionInfo})
})
.then(response => response.text())
.then(data => console.log(data))
.catch(error => console.error(error));
*/


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

app.get('/getUserInfo/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const result = await DB.getUserInfo(username);
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
