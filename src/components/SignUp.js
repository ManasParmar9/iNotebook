import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 

const SignUp = (props) => {

  const [credentials, setCredentials] = useState({name: "", email: "", password: ""}) 

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({name: credentials.name,email: credentials.email,password:credentials.password})
    });

    const json = await response.json()

    if(json.success){
      navigate("/home");
      props.showAlert("Account Created Successfully","success");
    }
    else{
      props.showAlert("Invalid Details","danger");
    }
  }

  const onChange = (e) => {
    setCredentials({...credentials, [e.target.name] : e.target.value})
};


  return (
    <div className="container">
      <h2 className="my-3">Please Create Account Here</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} required minLength={3}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required/>
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} required minLength={5}/>
        </div>
        <div className="form-group">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange} required/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
