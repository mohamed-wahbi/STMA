import React, { useEffect, useState } from "react";
import { json, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import validateToken from "../../validator/TokenValidator";
import HomeUser from "../../components/homeUser/HomeUser";
import FooterUser from "../../components/homeUser/FooterUser";
import Carosel from "../../components/homeUser/Carosel";
import Serveces from "../../components/homeUser/Serveces";
import Avies from "../../components/homeUser/Avies";

import axios from "axios";


const Home = () => {
  // *********************************|| token validator ||**********************
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isAdmin , setIsAdmin] = useState(false)
  const [userInfos,setUserInfos] = useState([]);
  const [aEntreprise,setAEntreprise] = useState(false)
  
  useEffect(() => {
    const isValidToken = validateToken(token);
    if(token){
      setIsAdmin((JSON.parse(atob(token.split('.')[1])).isAdmin))
    }
    if (!isValidToken && token==null ) {
      localStorage.removeItem("token");
      navigate("/");
    }

    getUserInfos()

  }, [token,aEntreprise]);
  // ************************************************************************

  console.log(aEntreprise)

  const getUserInfos = async () => {
    try {
      const userInfo = await axios.get('http://127.0.0.1:5050/api/auth/userinfo',
      { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
      )

      setUserInfos(userInfo.data);
      setAEntreprise(userInfo.data.haveCampany)


    } catch (error) {
      console.log("error lors de la getting info de l'utilisateur .",error);
    }
  }








  return (
    <div>
      <Header aEntreprise={aEntreprise} />
      <div className="titre">
        <HomeUser/>
        <Serveces />
        <Carosel />
        {/* <TestUploadMany /> */}
        <FooterUser />
        {isAdmin !== true ? <Avies /> : null}
      </div>
    </div>
  );
};

export default Home;
