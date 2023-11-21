import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function About() {
  let navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  
  return (
    <div>
      This is a About Page.
    </div>
  )
}

export default About
