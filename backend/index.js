const express = require('express');
const mongoDB = require('./db')
const app = express();

mongoDB();

// This is to link backend with frontend
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept"
    );
    next();
})


app.get('/',(req,res) => {
    res.send("Hello World");
})

app.use(express.json());
app.use('/api', require("./Routes/CreateUsers"));
app.use('/api', require("./Routes/DisplayData")); 

app.listen(5000);