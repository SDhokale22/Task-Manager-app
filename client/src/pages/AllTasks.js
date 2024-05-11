import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import { IoAddCircle } from "react-icons/io5";
import InputData from '../components/Home/InputData';
import axios from 'axios';
import toast from 'react-hot-toast';

const AllTasks = () => {
  const [inputDiv, setInputDiv] = useState("hidden");
  const [Data, setData] = useState();

  const [updatedData, setUpdatedData]  = useState({id:"", title:"", desc: ""})

  useEffect(()=> {
    const fetch = async ()=> {
    try{
        const res = await axios.get("http://localhost:8000/api/v1/task/allTasks",
        {
            headers:{
                "Content-Type" : "application/json"
              },
              withCredentials: true                
        });  
        //console.log(res); 
        setData(res.data.data);
    }catch(error){
        toast.error(error.res.data.message)
        console.log(error);
    }
}
fetch();
},[])


  return (
    <>
    <div>
    <div className='w-full flex justify-end px-4 py-2'>
    <button onClick={() => setInputDiv("fixed")}>
        <IoAddCircle className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300' />
    </button>  
    </div>
   
      <Cards home={"true"} setInputDiv={setInputDiv} data={Data} setUpdatedData={setUpdatedData}  />
       
    </div>
    <InputData inputDiv={inputDiv} setInputDiv={setInputDiv} updatedData={updatedData} setUpdatedData={setUpdatedData} />
    </>
  )
}

export default AllTasks