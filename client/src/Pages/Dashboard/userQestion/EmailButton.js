import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import {useParams} from 'react-router-dom'
import emailjs from "emailjs-com";


const EmailButton = ({ userId }) => {
  const [oneUserServices,setOneUserServices] = useState([]);
  const [servicesChoisis,setServicesChoisis] = useState([]);
  const [emailResponse, setEmailResponse] = useState({});
  let emailMessage ="";
  let client_name = "";


  let client_email = ""
  let client_tel = ""
    

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const fetcheOneUserServices = async (id) => {
    try {
      const userServices = await axios.get(`http://127.0.0.1:5050/api/user/service/getOne/${id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      setOneUserServices(userServices.data.getOneUser);
      setServicesChoisis(userServices.data.getOneUser.servicesChoisis)
      
    } catch (error) {
      console.log('Erreur lors de la fetcheOneUserServices ! ', error);
    }
  };



const handleSendEmail = () => {
   client_name = oneUserServices.username ;
   client_email = oneUserServices.email;
   client_tel = oneUserServices.numTel;
    // Construction du message de l'e-mail
    emailMessage = ``;
  
    servicesChoisis.forEach((service, serviceIndex) => {
      // service_name = service.serviceId.titreService ;
      // client_adresse = service.adresse 
      emailMessage +=`^********************************^\n`;
      emailMessage += `_ Service 🛠️(${serviceIndex + 1})🛠️ : || ${service.serviceId.titreService} || \n`;
      emailMessage += `_ Localisation 🌍 : ${service.adresse}\n`;
      emailMessage +=`^********************************^\n`;
      
      service.besoins.forEach((besoin, besoinIndex) => {
        emailMessage += `+ Votre Besoin Numero(${besoinIndex + 1}) 🧐 : ${besoin.texte} 🤔 \n`;
  
        
        // Obtenez la réponse technique spécifique à ce besoin
        const response = emailResponse[`${serviceIndex}_${besoinIndex}`] || '';

        emailMessage += `|-> Réponse Technique 🦾 : ${response}\n\n`;
      });
      emailMessage +=`_________________________________\n\n\n\n`
    });
  
    // Envoi de l'e-mail avec EmailJS
    const templateParams = {
      to_email: oneUserServices.email, // Adresse e-mail du client
      subject: "Réponse à vos besoins STMA ",
      message_html: emailMessage,
      client_name:client_name,
      client_email:client_email,
      client_tel:client_tel
    };
  
    emailjs
      .send(
        "service_3l48gv9",
        "template_uyi4jth",
        templateParams,
        "lDXVNFAWxDMn52JMH"
      )
      .then((response) => {
        console.log("E-mail envoyé :", response);
        setEmailResponse("E-mail envoyé avec succès !");
        alert("E-mail envoyé avec succès !")
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        setEmailResponse("Erreur lors de l'envoi de l'e-mail !");
        alert("Erreur lors de l'envoi de l'e-mail !")
      });
  };
   
    
  
 
     










 














    useEffect(() => {
      fetcheOneUserServices(userId);
    }, [userId]);






  return (
    <>
    
    <Button variant="primary" className="emailBtn" onClick={()=>{
      handleShow();
      fetcheOneUserServices(userId)
    }} >
        <i class="bi bi-envelope-at-fill"></i> Email
      </Button>

        
          <Offcanvas show={show} onHide={handleClose} placement="end">
            <Offcanvas.Header closeButton className="emailHeader">

            <Offcanvas.Title>Objet : Repondre A Besoins Client  </Offcanvas.Title>
            <Offcanvas.Title>Cher Client : {oneUserServices.username} </Offcanvas.Title>
            </Offcanvas.Header>
            {servicesChoisis.map((item , indexOf)=>{
              return(
            <Offcanvas.Body className="serviceCollection">
              <h5>Itroduction Service {indexOf+1} :</h5>
              <p className="merciClient">
              Nous tenaions à prendre un moment pour vous exprimer notre profonde gratitude pour la confiance que vous nous avez accordée. Votre décision de choisir <b>STMA</b> pour répondre à vos besoins 
                
                  <b> [ {item.serviceId.titreService} ] </b>
               
                nous honore et nous encourage énormément.
              </p>
              
              <div className="serviceReponse">

                <div className="serviceHead">
                  <b>Service : {item.serviceId.titreService} <i className={item.serviceId.icon}></i> </b>
                  <p>Localisation : {item.adresse}</p>
                </div>
              {item.besoins.map((item,besoinIndex)=>{
                return(
                  <div className="besoinReponse">
                    <b>Besoin numero {besoinIndex+1} :</b>
                    <p> {item.texte} </p>
                    <div className="reponseTechnique">
                      <b><i>Reponse Technique :</i></b>
                      <textarea
                       value={emailResponse[`${indexOf}_${besoinIndex}`] || ''} 
                       onChange={(e) => setEmailResponse({...emailResponse, [`${indexOf}_${besoinIndex}`]: e.target.value})} 
                       placeholder="Réponse technique ..."
                       />
                    </div>
                    
              </div>
                )
              })}
              

              
              </div>
              
            </Offcanvas.Body>
            )})}
            <button onClick={handleSendEmail}> <i class="bi bi-envelope-at-fill"></i>  Send-mail</button>
          </Offcanvas>
          
         
      
    </>
  );
};

export default EmailButton;
