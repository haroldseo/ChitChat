const { connect } = require("getstream");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const StreamChat = require("stream-chat").StreamChat;

require("dotenv").config();

const API_KEY = process.env.STREAM_API_KEY;
const API_SECRET = process.env.STREAM_API_SECRET;
const APP_ID = process.env.STREAM_APP_ID;

const signup = async (req, res) => {
  try {
    //Data from client to server
    const { fullName, username, password, phoneNumber } = req.body;
    //Randomly generate userId, 16 hexadecimal digits
    const userId = crypto.randomBytes(16).toString("hex");
    //Connect to Stream
    const serverClient = connect(API_KEY, API_SECRET, APP_ID);
    //Create a new user token and hash password
    const token = serverClient.createUserToken(userId);
    const hashedPassword = await bcrypt.hash(password, 10);
    //Pass data from server back to client
    res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const login = async (req, res) => {
  try {
    //Data from client to server
    const { username, password } = req.body;
    //Connect to Stream
    const serverClient = connect(API_KEY, API_SECRET, APP_ID);
    //Create new instance of StreamChat
    const client = StreamChat.getInstance(API_KEY, API_SECRET);
    //Query all users from database, to see if it matches this user
    const { users } = await client.queryUsers({ name: username });

    //If no users are found
    if (!users.length) return res.status(400).json({ message: "User not found" });
    //If user is found, decrypt password and compare it to the one the user created
    const success = await bcrypt.compare(password, users[0].hashedPassword);
    //Create new user token, passing that specific users id
    const token = serverClient.createUserToken(users[0].id);
    //If successful, pass data from server back to client
    if (success) {
      res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id });
    } else {
      res.status(500).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

module.exports = { signup, login };
