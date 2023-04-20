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

async function addItem(item) {
  const result = await testCollection.insertOne({ message: item });
  console.log(`Inserted document with _id: ${result.insertedId}`);

  const found = await testCollection.findOne({ _id: result.insertedId });
  console.log(`Found document: ${JSON.stringify(found)}`);

  return found;
}

// database.js
async function addInfo(sessionInfo) {  // USES SCORE COLLECTION
  //const testCollection = db.collection('test');

  const result = await testCollection.insertOne(sessionInfo);
  console.log(`Inserted document with _id: ${result.insertedId}`);

  const found = await testCollection.findOne({ _id: result.insertedId });
  console.log(`Found document: ${JSON.stringify(found)}`);
}

// database.js
async function getAllSessionsSortedByScore() {  //USES SCORE COLLECTION
  //const collection = client.db('startup').collection('sessionInfo');
  const cursor = testCollection.find();
  const sessionInfoArray = await cursor.toArray();
  //console.log(Retrieved ${sessionInfoArray.length} documents from sessionInfo collection);
  
  const sortedSessionInfoArray = sessionInfoArray.sort((a, b) => {
  return b.score - a.score;
  });
  
  return sortedSessionInfoArray;
  }

async function getInfo(username) {  //USES SCORECOLLECTION
  const result = await testCollection.findOne({ username: username });
  console.log(`Found document with username: ${username}`);

  return JSON.stringify(result);
}

async function getUserInfo(username) {
  const result = await testCollection.find({ username: username });
  console.log(`Found document with username: ${username}`);

  return JSON.stringify(result);
}

async function createUser(username, password) {
  // Generate a unique ID for the new user
  const userId = uuid.v4();

  // Hash the password using bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Insert the new user into the database
  const result = await userCollection.insertOne({
    _id: userId,
    username: username,
    password: hashedPassword
  });

  // Return the ID of the new user
  return userId;
}

async function existingUser(username, password) {
  // Look up the user in the database by username
  const user = await userCollection.findOne({ username: username });

  if (!user) {
    // User not found in the database
    return "Not found";
  }

  // Compare the hashed password from the database with the plain text password provided by the user
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    // Password does not match
    return "Not found";
  }

  // Username and password are both correct
  return "Success";
}

module.exports = {
  getAllSessionsSortedByScore,
  createUser,
  existingUser,
  getUserInfo,
    addItem,
    addInfo,
    getInfo

 };