import React, { useEffect, useState, useTransition } from "react";
import "./contact.css";
import Header from "../../components/header/Header";
import { useNavigate } from "react-router-dom";
import validateToken from "../../validator/TokenValidator";
import LogoA from "../../assets/logoA.jpg";
import CreateServiceForm from "./CreateServiceForm";
import TextServiceForm from "./TextServiceForm";
import axios from "axios";

import presonQuest from "../../assets/questionPerson.png"

const Contact = () => {
  const [isAdmin,setIsAdmin] = useState(null)

// ********************************************************************************************
// -------------------------CreateServiceForm----------------------
const [numTel, setNumTel] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [adresse, setAdresse] = useState('');
  const [besoins, setBesoins] = useState([]);
  const [texteBesoin, setTexteBesoin] = useState('');
  const [imagesBesoin, setImagesBesoin] = useState([]);
  const [remplireBesoinMsg,setremplireBesoinMsg] = useState ("")
  const [remplireServiceMsg,setremplireServiceMsg] = useState ("")


  const [userInfos,setUserInfos] = useState([]);
  const [aEntreprise,setAEntreprise] = useState(false)



  // --------------------Get All SERVICES--------------------
  const [servicesInfo,setServicesInfo] = useState([])

  const featchServices = async () =>{
  try {
    const servicesDatas = await axios.get(`http://127.0.0.1:5050/api/service/getAll`);
    console.log(servicesDatas.data.services)
    setServicesInfo(servicesDatas.data.services)
    
  } catch (error) {
    console.log('error lors de la featching services !',error)
  }    
  }

  useEffect(()=>{
    featchServices();
    
  },[])


// --------------------------Ajouter un service---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(numTel && serviceId && adresse && (besoins.length !== 0) && (remplireBesoinMsg==="") && besoins.every(besoin => besoin.texte && besoin.images.length !== 0)
    ){
      try {
        const newService = {
          numTel,
          serviceId,
          adresse,
          besoins
        };
  
        const response = await axios.post('http://127.0.0.1:5050/api/user/service/create', newService,
        {headers: { authorization: `Bearer ${localStorage.getItem("token")}`}}
        );

        console.log(response)
        setBesoins([]);
        setTexteBesoin('');
        setImagesBesoin([]);
        setNumTel('');
        setServiceId('');
        setAdresse('')

        alert("besoin est bien recus, nous allons vous contacter le plus tot possible . Merci pour votre confiance !")


      } catch (error) {
        console.error('Erreur lors de la création du service :', error);
      }
    }else{
      setremplireServiceMsg('Remplire tous les champs et crée votre besoin puis envoyer votre Service !')
      setTimeout(()=>{
        setremplireServiceMsg('')
      },3000)
    }
    
  };



// -------------------------------Ajouter un besoin----------------------
  const handleAddBesoin = () => {
    if(numTel && serviceId && adresse && texteBesoin){
      const newBesoin = {
        texte: texteBesoin,
        images: imagesBesoin
      };
      setBesoins([...besoins, newBesoin]);
      setTexteBesoin('');
      setImagesBesoin([]);
      setremplireBesoinMsg('')
      besoins.map((item)=>console.log(besoins))
    }else{
      setremplireBesoinMsg("Pour bien comprendre votre besoin, merci de remplir tous les champs !")
      setTimeout(function() {
        setremplireBesoinMsg('')
    }, 3000);
      
    }
    
  };



// ------------------------------------Handel image changer-------------------
  const handleImageChange = (e) => {
    const files = e.target.files;
    const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
    setImagesBesoin([...imagesBesoin, ...imageUrls]);
    console.log(files)
    console.log(imageUrls)

  };


// *****************************************************************************************  





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





























 
  // *********************************|| token validator ||**********************
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    
    setIsAdmin(JSON.parse(atob(token.split('.')[1])).isAdmin)
    const isValidToken = validateToken(token);
    if (!isValidToken) {
      localStorage.removeItem("token");
      navigate("/");
    }
    else if (isAdmin===true){
      navigate('/home');
    }

    getUserInfos();
    
  }, [token,isAdmin]);
  // ************************************************************************

  return (
    <div >
      <Header aEntreprise={aEntreprise} />
      <center style={{paddingTop:"70px",background:'#707370'}} ><h2 className="titreFormulaireMessage" data-aos="zoom-out" data-aos-delay="100">Si vous avez des questions, n'hésitez pas à les proposer.</h2></center>

      <div className="contactPage">
        {/* ****************************|formulaire|********************************* */}
       <div className="serviceFormContent">
       
       <CreateServiceForm 
       numTel={numTel} setNumTel={setNumTel}
       serviceId={serviceId} setServiceId={setServiceId}
       adresse={adresse} setAdresse={setAdresse}
       besoins={besoins} setBesoins={setBesoins}
       texteBesoin={texteBesoin} setTexteBesoin={setTexteBesoin}
       imagesBesoin={imagesBesoin} setImagesBesoin={setImagesBesoin}
       remplireBesoinMsg={remplireBesoinMsg}
       servicesInfo={servicesInfo}
       setServicesInfo={setServicesInfo}

       handleSubmit={handleSubmit}
       handleAddBesoin={handleAddBesoin}
       handleImageChange={handleImageChange}

       />


<TextServiceForm 
       numTel={numTel} setNumTel={setNumTel}
       serviceId={serviceId} setServiceId={setServiceId}
       adresse={adresse} setAdresse={setAdresse}
       besoins={besoins} setBesoins={setBesoins}
       texteBesoin={texteBesoin} setTexteBesoin={setTexteBesoin}
       imagesBesoin={imagesBesoin} setImagesBesoin={setImagesBesoin}
       remplireBesoinMsg={remplireBesoinMsg}
       remplireServiceMsg={remplireServiceMsg}

       handleSubmit={handleSubmit}
       handleAddBesoin={handleAddBesoin}
       handleImageChange={handleImageChange}
       /> 
       </div>

        {/* **********************|contacts|***************************************** */}

        <div className="isetContacts" data-aos="zoom-in" data-aos-delay="100" data-aos-once="true">
          <div className="isetLogo" data-aos="zoom-out" data-aos-delay="500" data-aos-once="true">
            <img src={LogoA} alt="logo agance ..." />
          </div>

          <div className="contactsData" data-aos="flip-up" data-aos-delay="800" data-aos-once="true">
            
          <div className="adresse">
            <label>Adresse : </label>
            <a href="#" target="_blanck">
              Route de kebili - BP n°61 - 4200 - Kébili Tunisie
            </a>
          </div>

          <div className="telephone">
            <label>Tel : </label>
            <a href="#" target="_blanck">
              {" "}
              +216 75 222 000
            </a>
          </div>

          <div className="fax">
            <label>Fax : </label>
            <a href="#" target="_blanck">
              +216 75 111 000
            </a>
          </div>

          <div className="socialmidia">
            <a className="google" href="#" target="_blanck">
              <i class="bi bi-google"></i>
            </a>
            <a className="facebook" href="#" target="_blanck">
              <i class="bi bi-facebook"></i>
            </a>
            <a className="twitter" href="#" target="_blanck">
              <i class="bi bi-twitter"></i>
            </a>
          </div>

          </div>


        </div>
      </div>
    </div>
  );
};

export default Contact;
