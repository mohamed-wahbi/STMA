import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import AsideDashboard from "../../components/asideMenuDash/AsideDashboard";
import Services from "./services/Services";
import UserAvies from "./userAvies/UserAvies";
import UserQestion from "./userQestion/UserQestion";
import Entreprise from "./entreprise/Entreprise";


const Dashboard = () => {
  const token = localStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState(null);
  const navigate = useNavigate();
  const [componentDash,setComponentDash] = useState("services");

  useEffect(() => {
    if (token != null) {
      setIsAdmin(JSON.parse(atob(token.split(".")[1])).isAdmin);
      if (isAdmin === false) {
        navigate("/home");
      }
    }
    if (token == null) {
      navigate("/");
    }
  }, [token, isAdmin]);

  return (
    <div>
      <Header />
      <div className="dashControle">
        <AsideDashboard setComponentDash={setComponentDash} />
        
        <div className="controleSectionDash">
    
        {componentDash==="services"?<Services />:null}
        {componentDash==="userAvies"?<UserAvies />:null}
        {componentDash==="userQestion"?<UserQestion />:null}
        {componentDash==="entreprise"?<Entreprise />:null}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
