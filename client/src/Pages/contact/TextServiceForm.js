import React from 'react';
import './textServiceForm.css';

const TextServiceForm = ({
  numTel,setNumTel,
    serviceId,setServiceId,
    adresse,setAdresse,
    besoins, setBesoins,
    texteBesoin, setTexteBesoin,
    imagesBesoin, setImagesBesoin,
    remplireBesoinMsg,
    remplireServiceMsg,

    handleSubmit,
    handleAddBesoin,
    handleImageChange
}) => {
  return (
    <div className='textServisesComponent'>
      <h2>Votre Besoin</h2>
      <div className='textServiceFormContent'>
        <div className='besoinTextHeader'>
          <b>Votre numero :</b> <i> {numTel} </i> <br/>
          <b>Votre Secteur Service :</b> <i> {serviceId} </i> <br/>
          <b>Votre Adresse Locale :</b> <i> {adresse} </i> <br/>
        </div>

        {besoins.map((item, index) => (
          <div className='besoinTextImg' key={index}>
            <div className='besoinText'>
              <h5>Description du besoin {index + 1} :</h5>
              <p>{item.texte}</p>
            </div>

            <div className='besoinImg'>
              <h5>Images Explicatives : </h5>
              <div className='imagesBesoin'>
                {item.images.map((imageBlob, imageIndex) => (
                  <img
                  key={imageIndex}
                  src={typeof imageBlob === 'object' ? URL.createObjectURL(imageBlob) : imageBlob}
                  alt='photo service'
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
                <button onClick={handleSubmit} type='submit' className="submit-button">Créer le service</button> <br/>
                <b style={{color:"red"}}> {remplireServiceMsg} </b>

      </div>
    </div>
  );
};

export default TextServiceForm;
