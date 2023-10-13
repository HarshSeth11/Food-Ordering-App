import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function SignUp() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    geolocation: "",
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reponse = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credentials.name,
        location:credentials.geolocation,
        email:credentials.email,
        password:credentials.password}
        )
    });

    const json = await reponse.json();
    console.log(json);

    if(!json.success){
        alert("Enter valid Credentials");
    }
    if(json.success){
        navigate("/login");
        alert("You're successfully signed in");
    }
    
  };

  const handleChange = (e) => {
    setCredentials({...credentials,
        [e.target.name]: e.target.value,
      });
  };
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label htmlFor="name" class="form-label">
              Name
            </label>
            <input
              type="text"
              class="form-control"
              name="name"
              value={credentials.name}
              onChange={handleChange}
            />
          </div>
          <div class="mb-3">
            <label htmlFor="location" class="form-label">
              Address
            </label>
            <input
              type="text"
              class="form-control"
              name="geolocation"
              value={credentials.geolocation}
              onChange={handleChange}
            />
          </div>
          <div class="mb-3">
            <label htmlFor="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div class="mb-3">
            <label htmlFor="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" class="btn btn-success m-3">
            Submit
          </button>
          <Link to="/login" className="btn btn-danger m-3">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}
