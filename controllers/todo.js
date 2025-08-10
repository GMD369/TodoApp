const Todo = require("../models/Todo")
const moment = require("moment")

const homeController = async (req, res, nex) => {
    try {
        const todos = await Todo.find({}).sort({ createdAt: -1 })
        res.locals.moment = moment
        res.render('index.ejs', { title: "List Todo", todos });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}


const addTodoPageController = (req, res, next) => {
    try {
        res.render('newTodo.ejs', { title: "Add Todo" });
    } catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

const updateTodoPageController=async(req, res, next) => {
    try{
        const {id}=req.query
        const todo=await Todo.findById(id)
        res.render('updateTodo.ejs',{title:"Update Todo",todo});
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

const deleteTodoPageController=async(req, res, next) => {
    try{
        const {id}=req.query
        const todo= await Todo.findById(id)
        res.render('deleteTodo.ejs',{title:"delete Todo",todo});
    }catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

const addTodoController=async(req,res,nex)=>{
    try{
        const {title,desc}=req.body;
        const newTodo=new Todo({
            title,desc
        })
        await newTodo.save();
        res.redirect('/');
    }
    catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

const updateTodoController=async(req,res,nex)=>{
    try{
        const {id}=req.params;
        const {title,desc}=req.body;
        const updateTodo=await Todo.findById(id);
        if(!updateTodo){
            res.status(404).json({
                message: "Todo not found",
                error: "Todo not found"
            })
        }
        updateTodo.title=title;
        updateTodo.desc=desc;
        await updateTodo.save();
        res.redirect('/');
    }
    catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}

const deleteTodoController= async (req,res,nex)=>{
    try{
        const {id}=req.params;
        await Todo.findByIdAndDelete(id)
        res.redirect("/")
    }
    catch(err){
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        })
    }
}



module.exports = { 
    homeController, 
    addTodoPageController,
    updateTodoPageController,
    deleteTodoPageController,
    addTodoController,
    updateTodoController,
    deleteTodoController
}