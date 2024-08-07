import React, { useEffect, useState } from 'react';
import './userQestion.css';
import Accordion from 'react-bootstrap/Accordion';
import axios from 'axios';
import EmailButton from './EmailButton';

const UserQestion = () => {
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5050/api/user/service/getAll`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      setQuestionData(response.data.utilisateursAvecServices);
      console.log(response.data.utilisateursAvecServices);
    } catch (error) {
      console.log('Error lors de la fetching des questions !', error);
    }
  };

  const handleDeleteBesoinServiceUser = async (userId, serviceId, besoinId) => {
    try {
      await axios.delete(`http://127.0.0.1:5050/api/user/service/delete/${userId}/${serviceId}/${besoinId}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
      });

      fetchQuestion();
    } catch (error) {
      console.log("Error lors de la suppression d'un besoin d'un service ! ", error);
    }
  };

  const handleConfirmeService = async (userId, serviceId) => {
    try {
      // Mise à jour des identifiants avant l'appel à l'API
      const updatedUserId = userId;
      const updatedServiceId = serviceId;

      await axios.put(`http://127.0.0.1:5050/api/user/service/update/${updatedUserId}/${updatedServiceId}`, {}, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      console.log("Service confirmé.");
      alert('Êtes-vous sûr de confirmer ce projet ?');
      fetchQuestion();

    } catch (error) {
      console.log("Error lors de la confirmation d'un besoin d'un service ! ", error);
    }
  };

  return (
    <div className='userQestionComponent'>
      <h3>Questions Des Services :</h3>
      <Accordion defaultActiveKey="0">
        {questionData.map((item1) => (
          <Accordion.Item eventKey={item1._id} key={item1._id}>
            <Accordion.Header>
              <h5>CLIENT : {item1.username} <i className="bi bi-bell-fill"></i></h5>
            </Accordion.Header>
            <Accordion.Body>
              <div className='infoGeneraleUser'>
                <div>
                  <b>Prénom : </b> <span>{item1.username}</span>
                </div>
                <div>
                  <b>Email : </b> <span>{item1.email}</span>
                </div>
                <div>
                  <b>Numéro-Tel : </b> <span>{item1.numTel}</span>
                </div>
              </div>
              {item1.servicesChoisis.map((item2) => (
                <div className='userBesoins' key={item2._id}>
                  <div className='besoinCard'>
                    <div className='serviceBord'><i className={item2.serviceId.icon}></i> {item2.serviceId.titreService}</div>
                    <div className='besoinDetailsTextAdresse'>
                      <b>Mon Adresse :</b>
                      <p>{item2.adresse}</p>
                      <p>{item2.isConfirme ? "ok" : "false"}</p>
                    </div>
                    {item2.besoins.map((item3, indexOf) => (
                      <div className='besoinDetails' key={item3._id}>
                        <div className='besoinDetailsText'>
                          <b>Besoin Numéro {indexOf + 1} : </b>
                          <p>{item3.texte}</p>
                        </div>
                        <div className='besoinDetailsImg'>
                          {item3.images.map((imageUrl, imageIndex) => (
                            <img key={imageIndex} src={
                              typeof imageUrl === 'string' ? imageUrl : URL.createObjectURL(imageUrl)} alt='icone' />
                          ))}
                        </div>

                        <div className='serviseBtnControler'>

                       <button className='deleteServiceBtn' onClick={() => handleDeleteBesoinServiceUser(item1._id, item2._id, item3._id)}>
                          <i className="bi bi-trash-fill"></i> Delete Besoin {indexOf + 1}
                        </button>

                        <div key={item2._id}>
                          {item2.isConfirme ?
                            <button style={{ background: "green" }}><i className="bi bi-bookmark-check-fill"></i> Projet Confirmé </button> :
                            <button onClick={() => handleConfirmeService(item1._id, item2._id)} style={{ background: "red" }}>
                              <i className="bi bi-bookmark-plus"></i> Confirmer ce projet
                            </button>}
                        </div>

                        </div>


                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className='btnContacts'>
                <EmailButton userId={item1._id} />
                <div className='telBtn'>
                  <a href="tel:+1234567890"><i className="bi bi-phone-fill"></i> Téléphone</a>
                </div>

              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default UserQestion;
