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

async function addInfo(item) {
  const sessionInfo = JSON.stringify(item);
  const result = await testCollection.insertOne({ username: item.username, sessionInfo });
  console.log(`Inserted document with _id: ${result.insertedId}`);
  
  const found = await testCollection.findOne({ _id: result.insertedId });
  console.log(`Found document: ${JSON.stringify(found)}`);
}

module.exports = {

    addItem,
    addInfo

 };