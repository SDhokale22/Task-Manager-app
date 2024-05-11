import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast from 'react-hot-toast';

const InputData = ({inputDiv, setInputDiv, updatedData,setUpdatedData}) => {

  const [Data, setData] = useState({title: "", desc: ""});

  useEffect(() => {
    setData({title:updatedData.title, desc:updatedData.desc})
  },[updatedData])

  const change = (e) => {
    const {name, value} = e.target;
    setData({...Data, [name] : value})
  }

  const updateTask = async(id) => {
    if(Data.title === "" || Data.desc === ""){
      alert("All fields are required");
    }else{
      await axios.put(`http://localhost:8000/api/v1/task/updateTasks/${updatedData.id}`, Data, {
      headers: {
        "Content-Type" : "application/json"
    },
      withCredentials: true
   })
  setUpdatedData({
    id: "",
    title:"",
    desc: ""
  });
  setData({
    title:"",
    desc: ""
  });

  setInputDiv("hidden");
  }; 
}

  const handleSubmit = async() => {
      if(Data.title === "" || Data.desc === ""){
        alert("All fields are required");
      }else{
      await axios.post(`http://localhost:8000/api/v1/task/create`, Data, {
      headers: {
        "Content-Type" : "application/json"
      },
      withCredentials: true
     })
    setData({
      title:"",
      desc: ""
    });
    setInputDiv("hidden");
    }; 
  }

  return (
    <>
        <div className={`${inputDiv} top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}>

        </div>
        <div className={`${inputDiv} top-0 left-0 flex items-center justify-center  h-screen w-full`}>
            <div className='w-2/6 bg-gray-900 p-4 rounded'> 
              <div className='flex justify-end '>
                <button 
                onClick={() => {
                setInputDiv("hidden");
                setData({title:"", desc: ""})
                setUpdatedData({id:"", title:"", desc: ""});
                }
                }
                 className='text-2xl'><RxCross2 /></button>
              </div>
                <input 
                type='text'
                placeholder='Title' 
                name='title'
                className='px-3 py-2 rounded w-full bg-gray-700 my-3' 
                value={Data.title}
                onChange={change}
                />
                <textarea 
                name='desc' 
                id='' 
                cols="30" 
                rows="10" 
                placeholder='Enter your Description' 
                className='px-3 py-2 bg-gray-700  my-3 rounded w-full'
                value={Data.desc}
                onChange={change} 
                >
                </textarea>
              
                {updatedData.id === "" ? (
                <button type='submit' onClick={handleSubmit} className='px-3 py-2 bg-blue-400 text-black text-xl font-semibold'>Submit</button> 
                ) : (
                  <button type='submit' onClick={updateTask} className='px-3 py-2 bg-blue-400 text-black text-xl font-semibold'>Update</button>
                )}
              
                
            </div>
        </div>
    </>
  )
}

export default InputData