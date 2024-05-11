import React, { useState } from 'react'
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import toast from "react-hot-toast";
import { useDispatch } from 'react-redux';

const Cards = ({home, setInputDiv, setUpdatedData}) => {
    const dispatch = useDispatch();

    //const headers = {id:localStorage.getItem("id"), authorization:` Bearer ${localStorage.getItem("token")}`};
    
    const handleCompleteTask = async (id) => {
        try{
            await axios.put(`http://localhost:8000/api/v1/task/updateCompleteTasks/${id}`,{
                headers:{
                    "Content-Type" : "application/json"
                  },
                  withCredentials: true   
            })
        }catch(error){
            console.log(error);
        }
    }

    const data = [
        {
            title: "The best coding channel",
            desc: "I have to create my channel the best ever coding channel",
            status: "Incomplete",
        },
        {
            title: "The best coding channel",
            desc: "I have to create my channel the best ever coding channel",
            status: "Incomplete",
        },
        {
            title: "The best coding channel",
            desc: "I have to create my channel the best ever coding channel",
            status: "complete",
        },
        
        {
            title: "The best coding channel",
            desc: "I have to create my channel the best ever coding channel",
            status: "Incomplete",
        },
    ];

    const handleImportant = async(id) => {
        try{
            const res = await axios.put(`http://localhost:8000/api/v1/task//updateImportantTasks/${id}`,{
                headers:{
                    "Content-Type" : "application/json"
                  },
                  withCredentials: true   
            });
            console.log(res);
            
        }catch(error){
            toast.error(error.res.data.message)
            console.log(error);
        }
    }
    
    const handleUpdate = async(id, title, desc) => {
       setInputDiv("fixed");
        setUpdatedData({id: id, title: title, desc: desc})
    }
    

    const deleteTaskHandler = async(id) => {
        try{
            const res = await axios.delete(`http://localhost:8000/api/v1/task/deleteTasks/${id}`,{
                headers:{
                    "Content-Type" : "application/json"
                  },
                  withCredentials: true   
            });
            //console.log(res);
            toast.success(res.data.message);
        }catch(error){
            toast.error(error.res.data.message)
            console.log(error);
        }
    }
    
    const [importantButton, setImportantButton] = useState("Incomplete");

  return (

    <div className='grid grid-cols-3 gap-4 p-4'>
        {data && data.map((items, i) => (
            <div className='flex flex-col justify-between bg-gray-700 rounded p-4'>
                <div>
                <h3 className='text-xl font-semibold'>{items.title}</h3> 
                <p className='text-gray-300 my-2'>{items.desc}</p>
            </div>
                <div className='mt-4 w-full flex items-center'>
                    {/*<button className={`${items.status === "Incomplete" ? "bg-red-400" : "bg-green-600"} p-2 rounded `}>*/}
                    <button onClick={() => handleCompleteTask(items._id)}
                     className={`${items.complete === true ? "bg-red-400" : "bg-green-600"} p-2 rounded `}>
                       {items.complete === true ? "complete" : "incomplete"}
                        {/* {items.status}*/}
                    </button>
                    
                    <div className='text-white p-2 w-3/6 text-2xl font-semibold flex justify-around'>
                        <button onClick={() => handleImportant(items._id)}>
                        {items.important === false ? ( 
                            <CiHeart />
                             ) : (
                            <FaHeart className='text-red-500'/> 
                        )}    
                        </button>
                        <button onClick={() => handleUpdate(items._id, items.title, items.desc)} >
                            <FaEdit />
                        </button>
                        <button  onClick={() => deleteTaskHandler(items._id)} >
                            <MdDelete />
                        </button>
                    </div>
                </div>
            </div>
        ))}
        {home === "true" &&
        <button onClick={() => setInputDiv("fixed")} className='flex flex-col justify-center items-center bg-gray-700 rounded p-4  text-gray-300 hover:scale-105 cursor-pointer transition-all duration-300'>
            <IoAddCircle className='text-5xl' />
           <h2 className='text-2xl mt-4'>
            Add Task
           </h2>  
        </button> }
    </div>
  )
}

export default Cards