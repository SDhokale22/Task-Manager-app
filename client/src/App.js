import React, { useEffect } from 'react'
import Home from './pages/Home'
import { Routes, Route, useNavigate} from "react-router-dom";
import AllTasks from './pages/AllTasks';
import ImportantTask from './pages/ImportantTask';
import CompletedTask from './pages/CompletedTask';
import IncompletedTask from './pages/IncompletedTask';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useDispatch, useSelector } from 'react-redux';
import { authactions } from './redux/userSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.user);

  useEffect(() => {
    if(user === false){
      navigate("/signup");
    }
  },[]);

  return (

    <div className='bg-gray-900 text-white h-screen p-2 relative'>
   
      <Routes>
        <Route exact path='/' element={<Home />} >
          <Route index element={<AllTasks />} />
          <Route path="/importantTasks" element={<ImportantTask />} />
          <Route path="/completedTasks" element={<CompletedTask />} />
          <Route path="/incompetedTasks" element={<IncompletedTask />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
