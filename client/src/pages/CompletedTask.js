import React, { useEffect, useState } from 'react'
import Cards from '../components/Home/Cards'
import axios from 'axios'
import toast from 'react-hot-toast'

const CompletedTask = () => {
  const [Data, setData] = useState();

  useEffect(()=> {
    const fetch = async ()=> {
    try{
        const res = await axios.get("http://localhost:8000/api/v1/task/alltasks",
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
    <div>
        <Cards home={"false"} />
    </div>
  )
}

export default CompletedTask