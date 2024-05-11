import { Task } from "../models/task.js";
import { User } from "../models/user.js";

export const Create = async (req, res) => {
    try{
        const {title, desc} = req.body;
        const {id} = req.headers;

        const newTask = new Task({title: title, desc: desc});
        const saveTask = await newTask.save();
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id, {$push:{tasks: taskId._id}});
        res.status(200).json({
            message: "Task Created",
            success: true
        });

    }catch(error){
        console.log(error);
    }
}

//all tasks
export const allTasks = async (req, res) => {
    try{
        const {id} = req.headers;

        const userData = await User.findById(id).populate({
        path: "tasks", 
        options: {sort: { createdAt: -1}},
    }); 

       res.status(200).json({ data: userData });

    }catch(error){
        console.log(error);
    }
}

//delete task
export const deleteTasks = async (req, res) => {
    try{
       const {id} = req.params;
       const userId = req.headers.id;

       await Task.findByIdAndDelete(id);
       await User.findByIdAndUpdate(userId, {$pull : {tasks:id}});

       res.status(200).json({ 
        message: "Task deleted succesfully",
        success: true,
       });
  
    }catch(error){
        console.log(error);
    }
}

//update task
export const updateTasks = async (req, res) => {
    try{
        const {id} = req.params;
        const {title, desc} = req.body;
        await Task.findByIdAndUpdate(id, {title: title, desc: desc});
        
        res.status(200).json({ 
            message: "Task updated succesfully",
            success: true,
           });
    }catch(error){
        console.log(error);
    }
}

//important task
export const updateImportantTasks = async (req, res) => {
    try{
        const {id} = req.params;
        const TaskData = await Task.findById(id);
        const impTask = TaskData.important;
        await Task.findByIdAndUpdate(id, {important: !impTask});
        
        res.status(200).json({ 
            message: "Important task updated succesfully",
            success: true,
           });
    }catch(error){
        console.log(error);
    }
}

//complete task
export const updateCompleteTasks = async (req, res) => {
    try{
        const {id} = req.params;
        const TaskData = await Task.findById(id);
        const completeTask = TaskData.complete;
        await Task.findByIdAndUpdate(id, {complete: !completeTask});
        
        res.status(200).json({ 
            message: "Task updated succesfully",
            success: true,
           });
    }catch(error){
        console.log(error);
    }
}

//get imortant tasks
export const importantTasks = async (req, res) => {
    try{
       const {id} = req.headers;
       const Data = await User.findById(id).populate({
        path: "tasks",
        match: {important:true}, 
        options: {sort: { createdAt: -1}},
    });

    const impTaskData = Data.tasks;

       res.status(200).json({ 
        data: impTaskData,
       });
  
    }catch(error){
        console.log(error);
    }
}

//get complete tasks
export const completeTasks = async (req, res) => {
    try{
       const {id} = req.headers;
       const Data = await User.findById(id).populate({
        path: "tasks",
        match: {complete:true}, 
        options: {sort: { createdAt: -1}},
    });

    const compTaskData = Data.tasks;

       res.status(200).json({ 
        data: compTaskData,
       });
  
    }catch(error){
        console.log(error);
    }
}

//get incomplete tasks
export const incompleteTasks = async (req, res) => {
    try{
       const {id} = req.headers;
       const Data = await User.findById(id).populate({
        path: "tasks",
        match: {complete:false}, 
        options: {sort: { createdAt: -1}},
    });

    const compTaskData = Data.tasks;

       res.status(200).json({ 
        data: compTaskData,
       });
  
    }catch(error){
        console.log(error);
    }
}
