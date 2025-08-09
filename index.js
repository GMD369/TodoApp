const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { title } = require('process');

const PORT= process.env.PORT || 3000;


// init app
const app = express();

const connectionURL="mongodb://localhost:27017/tododb";

mongoose.connect(connectionURL)
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    })

// View engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res,nex) => {
    try{
        res.render('index.ejs',{title:"List Todo"});
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
})

app.get('/add-todo', (req, res, next) => {
    try{
        res.render('newTodo.ejs',{title:"Add Todo"});
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
})

app.get('/update-todo', (req, res, next) => {
    try{
        res.render('updateTodo.ejs',{title:"Update Todo"});
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
})

app.get("/delete-todo", (req, res, next) => {
    try{
        res.render('deleteTodo.ejs',{title:"delete Todo"});
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
})

// listen server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})