import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setuser } from "../redux/userSlice";
import { fetchTasks } from "../redux/taskSlice";

function Dashboard() {
  const { tasks, loading, error } = useSelector((state) => state.task);
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setfilter] = useState("All");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");
      const res = await axios.get(`http://localhost:3000/api/users/${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(setuser({ user: res.data.user }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUser();
    dispatch(fetchTasks());
  }, []);

  const addTask = async () => {
    if (title.trim() === "") {
      alert("enter a task first");
      return;
    }
    const data = {
      title,
      description,
      category,
      dueDate,
    };
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:3000/api/tasks", data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        dispatch(fetchTasks());
      }
      setTitle("");
      setdescription("");
      setCategory("");
      setDueDate("");
    } catch (error) {
      console.log(error);
      alert(error.response.message);
    }
  };

  const totalTasks = tasks?.length || 0;
  const completedTasks = tasks?.filter((t) => t.completed).length || 0;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#121317] text-white ">
      <Navbar />

      <div className="p-6 flex flex-col max-w-4xl gap-2 pt-[120px] mx-auto">
        <div className="mb-6">
          <h2 className="text-3xl">Hello {currentUser?.name.toUpperCase()},</h2>
        </div>
        <div className="mb-4  p-5 rounded-lg bg-[#0b0b0e]">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task..."
            className="p-2 w-full focus:outline-1 rounded focus:outline-gray-400"
          />
          <textarea
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            placeholder="add description..."
            className="p-2 w-full focus:outline-1 rounded focus:outline-gray-400"
          />
          <div className="flex gap-3">
            <select
              className="mt-2 w-full p-2 border rounded focus:outline-0 border-gray-400  *:bg-neutral-800"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="General">General</option>
              <option value="Work">Work</option>
              <option value="Home">Home</option>
              <option value="Urgent">Urgent</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className=" border border-gray-400 rounded bg-[#535fa1]"
            />
            <button
              onClick={addTask}
              className="mt-2 px-4 py-2 bg-[#535fa1] cursor-pointer hover:scale-105 text-white rounded min-w-24"
            >
              Add Task
            </button>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-lg mb-2">Progress: {progress}%</p>
          <div className="h-2 bg-gray-300 rounded">
            <div
              className="h-full bg-[#535fa1]  rounded"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <ul className="space-y-3">
          {loading ? (
            <p>loading...</p>
          ) : error ? (
            <p>{error.msg}</p>
          ) : tasks?.length !== 0 ?
            (tasks.map((task, index) => <TaskCard task={task} key={index} />)
          ): (
            <h1 className="mt-4 text-center text-lg text-gray-300">Add new tasks </h1>
          )
          }
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
