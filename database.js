const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const userCollection = client.db('startup').collection('user');
const scoreCollection = client.db('startup').collection('score');

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

  async function saveSessionInfo(sessionInfo) {
    try {
      const existingScore = await scoreCollection.findOne({ username: sessionInfo[2].username });
  
      if (existingScore) {
        // Update existing score if it exists
        await scoreCollection.updateOne(
          { username: sessionInfo[2].username },
          {
            $set: {
              score: sessionInfo[2].score,
              userRGB: sessionInfo[1],
              actualRGB: sessionInfo[0]
            }
          }
        );
      } else {
        // Insert new score if it doesn't exist
        const newScore = {
          username: sessionInfo[2].username,
          score: sessionInfo[2].score,
          userRGB: sessionInfo[1],
          actualRGB: sessionInfo[0]
        };
        await scoreCollection.insertOne(newScore);
      }
    } catch (err) {
      console.error(err);
    }
  }


  function storeScores(score) {
    scoreCollection.insertOne(score);  
  }

  function getRGB(username) {
    return scoreCollection.findOne({username : username})
  }

module.exports = {

    saveSessionInfo,
    storeScores,
    getRGB,
    createUser

 };