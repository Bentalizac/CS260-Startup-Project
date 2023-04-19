const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

console.log(process.env.MONGOUSER);
console.log(process.env.MONGOPASSWORD);
console.log(process.env.MONGOHOSTNAME);


const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

console.log(userName);
console.log(password);
console.log(hostname);


if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);

const userCollection = client.db('startup').collection('user');
const scoreCollection = client.db('startup').collection('score');
const testCollection = client.db('startup').collection('testing');

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

function addScore(score) {
  scoreCollection.insertOne(score);
}

function getHighScores() {
  const query = {};
  const options = {
    sort: { score: -1 },
    limit: 10,
  };
  const cursor = scoreCollection.find(query, options);
  return cursor.toArray();
}



async function addItem(item) {
  const result = await testCollection.insertOne({ message: item });
  console.log(`Inserted document with _id: ${result.insertedId}`);

  const found = await testCollection.findOne({ _id: result.insertedId });
  console.log(`Found document: ${JSON.stringify(found)}`);

  return found;
}

getAllInfo: async () => {
  try {
    const result = await testCollection.find({}, { _id: 0 });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// database.js
async function addInfo(sessionInfo) {
  //const testCollection = db.collection('test');

  const result = await scoreCollection.insertOne(sessionInfo);
  console.log(`Inserted document with _id: ${result.insertedId}`);

  const found = await testCollection.findOne({ _id: result.insertedId });
  console.log(`Found document: ${JSON.stringify(found)}`);
}

async function getInfo(username) {
  const result = await testCollection.findOne({ username: username });
  console.log(`Found document with username: ${username}`);

  return JSON.stringify(result);
}

module.exports = {
    getInfo,
    addItem,
    addInfo,
    getUser,
    getUserByToken,
    createUser,
    addScore,
    getHighScores,  
 };