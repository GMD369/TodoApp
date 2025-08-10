const Todo=require("../models/Todo")
const express=require("express")
const todo=require("../controllers/todo")

const router=express.Router()

router.get('/',todo.homeController )

router.get('/add-todo',todo.addTodoPageController )

router.get('/update-todo',todo.updateTodoPageController )

router.get("/delete-todo",todo.deleteTodoPageController )

router.post("/add-todo",todo.addTodoController)

router.post("/update-todo/:id",todo.updateTodoController)

router.get("/deletetodo/:id",todo.deleteTodoController)

module.exports=router