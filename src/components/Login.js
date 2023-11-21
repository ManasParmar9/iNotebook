import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; 

const Login = (props) => {

  const [credentials, setCredentials] = useState({email: "", password: ""}) 

  let navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('token') // your saved token in localstorage
    if (user && user !== 'undefined') {            // check for not undefined
        navigate("/home");
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({email: credentials.email,password:credentials.password})
    });

    const json = await response.json()

    if(json.success){
      navigate("/home");
      localStorage.setItem("token",json.authToken)
    }
    else{
      props.showAlert("Invalid Credentials","danger");
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value})
};

  return (
    <div className="container">
      <h2 className="my-3">Please Log In Here</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={credentials.email}
            onChange={onChange}
            autoComplete="true"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="password"
            value={credentials.password}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
