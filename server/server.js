// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); 
const app = express();
const path = require("path")

// routes
const todo = require("./routes/todo"); 

// connect database
connectDB();

// cors - so we can make API calls fron frontend app
app.use(cors({ origin: true, credentials: true }));

// initialize middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

// use routes
app.use("/api/todo", todo);

//for Heroku Delpoyment -> Node.js + React app
app.use(express.static(path.join(__dirname, '/client/build')));
app.get('*', (req, res) => { 
  res.sendFile(path.join(__dirname + '/client/build/index.html')) 
});

// setting up port
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});