import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({setToggle,toggel,aEntreprise}) => {
  const [isAdmin,setIsAdmin]=useState(false)
  const [haveCampany,setHaveCampany]=useState(false)
  const token = localStorage.getItem('token');
  useEffect(()=>{
    if(token){
      setIsAdmin((JSON.parse(atob(token.split('.')[1])).isAdmin))
      setHaveCampany((JSON.parse(atob(token.split('.')[1])).haveCampany))
    }
  },[isAdmin,haveCampany])
  return (
    <nav
      className="navbar"
      style={{ clipPath: toggel && "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="nav-links">
        <Link to='/home' className="nav-link" onClick={() => setToggle((prev) => !prev)}>
          <i class="bi bi-house-door-fill"></i> Home
        </Link>
        {
          isAdmin===false?<Link to='/contact' className="nav-link" onClick={() => setToggle((prev) => !prev)}>
          <i class="bi bi-person-check"></i> Contact
        </Link>:null
        }
        


        {
          (isAdmin===false ) && (aEntreprise===false) ?<Link to='/entreprise' className="nav-link" onClick={() => setToggle((prev) => !prev)}>
          <i class="bi bi-building-add"></i> Entreprise
        </Link>:null
        }





        {
          isAdmin===true?<Link to='/dashboard' className="nav-link" onClick={() => setToggle((prev) => !prev)}>
          <i class="bi bi-person-check"></i> Dashboard
        </Link>:null
        }
        







        
      </div>
    </nav>
  );
};

export default NavBar;
