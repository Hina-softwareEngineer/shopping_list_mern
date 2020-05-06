const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const items = require('./routes/api/items');


const app = express();

// Body Parser Middleware

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))


// DB config

const db = require('./config/key').mongoURI;

// Connect to Mongo

mongoose.connect(db, { useNewUrlParser : true, useUnifiedTopology: true})
        .then(()=> console.log('MongoDB Connected...'))
        .catch(err => console.log(err));

// routes
app.use('/api/items', items);



const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server Started on Port : ", port);
});