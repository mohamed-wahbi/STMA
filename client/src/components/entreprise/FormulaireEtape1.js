import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './form1.css';
import Header from '../header/Header';
import axios from 'axios';

const FormulaireEtape1 = ({ onNext, nomEntreprise, setNomEntreprise, logoEntreprise, setLogoEntreprise, secteurActivite, setSecteurActivite, description, setDescription }) => {

  const [serveces,setServeces] = useState([]);

  useEffect(()=>{
    getServeces();
  },[])


  const getServeces = async()=>{
    try {
      const servicesData = await axios.get('http://127.0.0.1:5050/api/service/getAll')
      setServeces(servicesData.data.services)
      
    } catch (error) {
      console.log("error lors de la getting serveces !",error)
    }
  }




  const handleNomChange = (e) => {
    setNomEntreprise(e.target.value);
  };

  const handleLogoChange = (e) => {
    const image = e.target.files[0];
    setLogoEntreprise(image);
  };

  const handleSecteurChange = (e) => {
    setSecteurActivite(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nomEntreprise', nomEntreprise);
    formData.append('logoEntreprise', logoEntreprise);
    formData.append('secteurActivite', secteurActivite);
    formData.append('description', description);
    onNext(formData);
  };

  return (
    <>
      <Header />
      <div className='f1Page'>
        <h2>Information generale sur l'entreprise </h2>
        <form onSubmit={handleSubmit} className="form-container">
          <label>
            Nom de l'entreprise:
            <input type="text" value={nomEntreprise} onChange={handleNomChange} required />
          </label>
          <label>
            Logo de l'entreprise:
            <input type="file" accept="image/*" onChange={handleLogoChange} required />
          </label>
          <label>
            Secteur d'activité:
            <select value={secteurActivite} onChange={handleSecteurChange}>
              {
                serveces.map((item)=>{
                  return(
                    <option> {item.titreService} </option>
                  )
                })
              }
             
            </select>
          </label>
          <label>
            Description:
            <textarea value={description} onChange={handleDescriptionChange} required />
          </label>
          <button type="submit">Suivant</button>
          <Link to={'/entreprise'}>
            <button type="button">Annuler</button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default FormulaireEtape1;
