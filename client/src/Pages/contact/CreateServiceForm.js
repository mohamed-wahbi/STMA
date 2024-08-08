import React, { useState } from 'react';
import axios from 'axios';
import './createServiceForm.css'; // Importez le fichier CSS

const CreateServiceForm = (
  {

    numTel,setNumTel,
    serviceId,setServiceId,
    adresse,setAdresse,
    besoins, setBesoins,
    texteBesoin, setTexteBesoin,
    imagesBesoin, setImagesBesoin,
    remplireBesoinMsg,
    servicesInfo,
    setServicesInfo,
    files,
    setFiles,

    handleSubmit,
    handleAddBesoin,
    handleImageChange

  }
  ) => {
  

  return (
    <div className="create-service-container">
      <h2>Créer un nouveau service</h2>
      <form className="create-service-form" onSubmit={handleSubmit}>
        <label htmlFor="numTel">Numéro de téléphone :</label>
        <input type="text" id="numTel" value={numTel} onChange={(e) => setNumTel(e.target.value)}  />

        <label htmlFor="serviceId">Service :</label>
        {/* <input type="text" id="serviceId" value={serviceId} onChange={(e) => setServiceId(e.target.value)} /> */}

        <select id="serviceId" onChange={(e)=>setServiceId(e.target.value)} className='selectService'>
          {servicesInfo.map((item)=>{
           
            return(
              <option value={item._id}> {item.titreService} </option>
            )
          })}
        </select>




        <label htmlFor="adresse">Adresse :</label>
        <input type="text" id="adresse" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
        
        {/* Ajout des besoins */}
        <label htmlFor="texteBesoin">Texte du besoin :</label>
        <input type="text" id="texteBesoin" value={texteBesoin} onChange={(e) => setTexteBesoin(e.target.value)} />
        <input type="file" value={files} onChange={handleImageChange} multiple />
        <b style={{color:"red"}}> {remplireBesoinMsg} </b>
        
        {/* Affichage des images sélectionnées */}
        <div className="besoins-images-container">
          {imagesBesoin.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index}`} className="besoin-image" />
          ))}
        </div>
        <button type="button" onClick={handleAddBesoin}>Ajouter le besoin</button>

      </form>
    </div>
  );
};

export default CreateServiceForm;
