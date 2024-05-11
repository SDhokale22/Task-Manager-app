import React, { useEffect, useState } from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { authactions } from '../../redux/userSlice';

const Sidebar = () => {

    const { user } = useSelector(store => store.user);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const data = [
        {
            title: "All tasks",
            icon: <CgNotes />,
            link: "/",
        },
        {
            title: "Important tasks",
            icon: <MdLabelImportant />,
            link: "/importantTasks",
        },
        {
            title: "completed tasks",
            icon: <FaCheckDouble />,
            link: "/completedTasks",
        },
        {
            title: "Incompleted tasks",
            icon: <TbNotebookOff />,
            link: "/incompetedTasks",
        },
    ];

    const [Data, setData] = useState();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(authactions(null));
        } catch (error) {
            console.log(error);
        }
    }


    //const headers = {id:localStorage.getItem("id"), authorization:` Bearer ${localStorage.getItem("token")}`};

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/v1/task/allTasks",
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true,
                    });
                console.log(res);
                setData(res.data.data);
            } catch (error) {
                toast.error(error.res.data.message)
                console.log(error);
            }
        }
        fetch();
    }, [])

    return (
        <>
            <div>
                <h2 className='text-xl font-semibold'>{user?.username}</h2>
                <h4 className='mb-2 my-1 text-gray-500'>{user?.email}</h4>
                <hr />
            </div>
            <div>
                {data.map((items, i) => (
                    <Link
                        to={items.link}
                        key={i}
                        className='my-2 flex items-center hover:bg-slate-800 p-2 rounded transition-all'
                    >
                        {items.icon} &nbsp; {items.title}
                    </Link>
                ))}
            </div>
            <div>
                <button onClick={logoutHandler} className='bg-gray-600 w-full rounded p-2'>Log Out</button>
            </div>
        </>
    );
};

export default Sidebar