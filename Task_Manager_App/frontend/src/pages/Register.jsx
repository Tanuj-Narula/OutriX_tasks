import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("All fields are required");
      return;
    }

    const data = { name, email, password };

    try {
      const res = await axios.post('http://localhost:3000/api/users/register', data);
      if(res.status===200){
        alert(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      alert(err.response.data.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-[url('https://res.cloudinary.com/dtlt434f7/image/upload/v1753621371/background-realistic-abstract-technology-particle_23-2148431735_vdzzfr.jpg')]">
      <div className="bg-[#0b0b0e] z-10 text-white p-8 rounded shadow w-[25vw] h-[50vh] flex flex-col items-center ">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-2 mb-3 focus:outline-gray-500 focus:outline-1 rounded bg-[#121317]"
        />
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
          onClick={handleRegister}
          className="w-[40%] rounded-md mt-4 bg-[#535fa1] cursor-pointer hover:scale-[102%] py-2"
        >
          Register
        </button>
        <span className="flex gap-2 mt-4">
          <p>Already have an account? </p>
          <NavLink to={"/login"} className={"hover:underline"}>
            Sign in
          </NavLink>
        </span>
      </div>
    </div>
  );
}

export default Register;
