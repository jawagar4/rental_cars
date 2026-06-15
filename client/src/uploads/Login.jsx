import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import API from '../Auth/Auth'


function Login() {

   const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/login", {
        email : formData.email, // ⚠️ mapping email → username
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login Failed");
    }
  };


  return (
    <div className="register-container d-flex justify-content-center align-items-center ">
      <div className="register-card m-3">
        <h2 className="title">Login</h2>
        <p className="message">
          Signup now and get full access to our app.
        </p>

         <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control custom-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control custom-input"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn submit-btn w-100"
          >
            Login
          </button>

          <p className="signin mt-3">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
      <style>
        {`
        .register-container {
  min-height: 100vh;
  background: #121212;
}

.register-card {
  width: 100%;
  max-width: 450px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 20px;
  padding: 30px;
  color: #fff;
}

.title {
  color: #00bfff;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.message {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
}

.custom-input {
  background: #333 !important;
  border: 1px solid #555 !important;
  color: #fff !important;
  padding: 12px;
}

.custom-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.custom-input:focus {
  background: #333 !important;
  color: #fff !important;
  border-color: #00bfff !important;
  box-shadow: 0 0 5px #00bfff;
}

.submit-btn {
  background: #00bfff;
  color: #fff;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 10px;
}

.submit-btn:hover {
  background: #0099cc;
  color: #fff;
}

.signin {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}

.signin a {
  color: #00bfff;
  text-decoration: none;
}

.signin a:hover {
  text-decoration: underline;
}`}
      </style>
    </div>
  );
}

export default Login;