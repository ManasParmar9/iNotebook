import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notes from "./Notes";

function Home(props) {

  let navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("token")){
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);

  return ( 
    <>
      <div className="container my-3">  
        <Notes showAlert={props.showAlert}/>
      </div>
    </>
  );
}

export default Home;
