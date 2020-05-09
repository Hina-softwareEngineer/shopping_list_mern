const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
const path = require('path');
const config = require('config');


const app = express();

// Body Parser Middleware

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended : true }))

app.use(express.json())


// DB config

const db = config.get('mongoURI');

// Connect to Mongo

mongoose.connect(db, { useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex : true})
        .then(()=> console.log('MongoDB Connected...'))
        .catch(err => console.log(err));

// routes
app.use('/api/items',  require('./routes/api/items'));
app.use('/api/users',  require('./routes/api/users'));
app.use('/api/auth',  require('./routes/api/auth'));

// server static assets if in production

if(process.env.NODE_ENV === 'production'){
    // Set Static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log("Server Started on Port : ", port);
});