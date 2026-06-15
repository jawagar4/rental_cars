import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CarContext} from '../Context/CarContext'
import API from '../Auth/Auth'


function Signup() {
  const { loading, setLoading} = useContext(CarContext);

const navigate = useNavigate();

const [formData, setFormData] = useState({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    setLoading(true);

    const res = await API.post("/register", {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    alert(res.data.message);

    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);

  } catch (error) {
    setLoading(false);
    console.log(error);
    alert("Registration Failed");
  }
};

  return (
    <div className="register-container d-flex justify-content-center align-items-center ">
      <div className="register-card m-3">
        <h2 className="title">Register</h2>
        <p className="message">
          Signup now and get full access to our app.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className=" mb-3">
              <input
                type="text"
                  name="username"
                className="form-control custom-input"
                placeholder="First Name"
                 onChange={handleChange}
                required
              />
            </div>

           
          </div>

          <div className="mb-3">
            <input
              type="email"
             name="email"
              className="form-control custom-input"
              placeholder="Email"
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
              required
               onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              className="form-control custom-input"
              placeholder="Confirm Password"
              required
               onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn submit-btn w-100">
            Register
          </button>

          <p className="signin mt-3">
            Already have an account? <a href="/Login">Sign In</a>
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

export default Signup;