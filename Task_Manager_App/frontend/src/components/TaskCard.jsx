import React, { useState } from "react";
import axios from "axios";
import { fetchTasks } from "../redux/taskSlice";
import { useDispatch } from "react-redux";

const TaskCard = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description || "",
    category: task.category || "General",
    dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
  });
  const handleChange = (e) => {
    setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
  };

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `http://localhost:3000/api/tasks/${task._id}/toggle`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        dispatch(fetchTasks());
      }
    } catch (error) {
      console.error("Failed to toggle task:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.delete(
        `http://localhost:3000/api/tasks/${task._id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status == 200) {
        dispatch(fetchTasks());
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.response?.data?.message || "Failed to delete task");
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.put(
        `http://localhost:3000/api/tasks/${task._id}`,
        editedTask,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        dispatch(fetchTasks());
        setIsEditing(false);
      }
    } catch (err) {
      console.error("Update error:", err);
      alert(err.response?.data?.message || "Failed to update task");
    }
  };

  return (
    <div className="flex items-center gap-5 px-4 py-3 bg-[#0b0b0e] rounded-lg shadow mb-3">
      <div className="flex items-center space-x-3">
        <label className="relative flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleComplete}
            className="peer cursor-pointer appearance-none w-5 h-5 border border-gray-600 rounded-sm bg-[#0b0b0e]"
          />
          <svg
            className="absolute w-3 h-3 text-gray-100 left-1 top-1 hidden peer-checked:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </label>
      </div>
      <div className="flex items-center justify-between w-[90%]">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white p-1 rounded"
            />
            <textarea
              name="description"
              value={editedTask.description}
              placeholder="description"
              onChange={handleChange}
              className="w-full bg-gray-800 text-white p-1 rounded"
            />
            <select
              name="category"
              value={editedTask.category}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white p-1 rounded"
            >
              <option>General</option>
              <option>Work</option>
              <option>Home</option>
              <option>Urgent</option>
            </select>
            <input
              type="date"
              name="dueDate"
              value={editedTask.dueDate}
              onChange={handleChange}
              className="w-full bg-gray-800 text-white p-1 rounded"
            />
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-16">
              <h3
                className={`text-lg font-semibold ${
                  task.completed ? "line-through text-gray-400" : "text-white"
                }`}
              >
                {task.title}
              </h3>
              {task.dueDate && (
                <span className="text-xs text-gray-300">
                  Due: {new Date(task.dueDate).toISOString().split("T")[0]}
                </span>
              )}
            </div>
            {task.category && (
              <p className="text-sm text-gray-400">({task.category})</p>
            )}
            <p className="text-sm text-gray-400">{task.description}</p>
          </div>
        )}

        {isEditing ? (
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-3 py-1 rounded hover:scale-105 cursor-pointer"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              if (task.completed) handleDelete();
              else setIsEditing(true);
            }}
            className={`${
              task.completed ? "bg-red-600" : "bg-[#535fa1]"
            } text-white px-3 py-1 rounded hover:scale-105 cursor-pointer`}
          >
            {task.completed ? "Delete" : "Edit"}
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
