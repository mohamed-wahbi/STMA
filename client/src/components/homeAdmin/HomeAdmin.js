import React, { useEffect, useState } from "react";
import "./homeAdmin.css";
import { useNavigate } from "react-router-dom";
import validateToken from "../../validator/TokenValidator";
import Header from "../header/Header";
import Home from "../../Pages/Home_page/Home";

const HomeAdmin = () => {
  const [isAdminVerif,setIsAdminVerif] = useState(null)
  // *********************************|| token validator ||**********************
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  


  useEffect(() => {
  
      if(token!=null){
        setIsAdminVerif (JSON.parse(atob(token.split('.')[1])).isAdmin);
      }
    const isValidToken = validateToken(token);
    if (!isValidToken || isAdminVerif === false) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [token,isAdminVerif]);
  // ************************************************************************

  const handelLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <Header />
      <Home/>



    </div>
  );
};

export default HomeAdmin;
