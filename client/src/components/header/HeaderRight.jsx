import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const HeaderRight = ({ aEntreprise }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [haveCampany, setHaveCampany] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setIsAdmin(decodedToken.isAdmin);
      setHaveCampany(decodedToken.haveCampany);
    }
  }, [aEntreprise]);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const deconnectEntreprise = await axios.put(
        "http://127.0.0.1:5050/api/entreprise/deconnect",
        {},
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(deconnectEntreprise);
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log("Error lors de la déconnexion de l'entreprise !", error);
    }
  };

  return (
    <div className="header-right">
      <Link to="/" onClick={handleLogout} className="header-right-link">
        <i className="bi bi-box-arrow-in-right"></i>
        <span>LOGOUT</span>
      </Link>
      {(!isAdmin && aEntreprise) && (
        <Link to="/company" className="header-right-link">
          <i className="bi bi-building-fill-add"></i>
          <span>ENTREPRISE</span>
        </Link>
      )}
    </div>
  );
};

export default HeaderRight;
