import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { setcredentials } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter both email and password");
      return;
    }

    const data = { email, password };

    try {
      const res = await axios.post("http://localhost:3000/api/users/login", data);
      if (res.status === 200) {
        alert(res.data.message);
        dispatch(setcredentials(res.data));
        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-[url('https://res.cloudinary.com/dtlt434f7/image/upload/v1753621371/background-realistic-abstract-technology-particle_23-2148431735_vdzzfr.jpg')]">
      <div className="bg-[#0b0b0e] text-white p-8 rounded shadow w-[25vw] h-[45vh] flex flex-col items-center ">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-3 focus:outline-gray-500 focus:outline-1 rounded bg-[#121317]"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-3 focus:outline-gray-500 focus:outline-1 rounded bg-[#121317]"
        />
        <button
          onClick={handleLogin}
          className="w-[40%] mt-4 rounded-md bg-[#535fa1] cursor-pointer hover:scale-[102%] text-white py-2"
        >
          Login
        </button>
        <span className="flex gap-2 mt-4">
          <p>doesn't have an account? </p>
          <NavLink to={"/register"} className={"hover:underline"}>
            Sign up
          </NavLink>
        </span>
      </div>
    </div>
  );
}

export default Login;
