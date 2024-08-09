import React, { useState } from 'react';
import './form3.css';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';

import axios from 'axios';

const FormulaireEtape3 = ({
  serveces,
  specialites,
  nomEntreprise,
  secteurActivite,
  description,
  nomResponsable,
  numeroEntreprise,
  adresseEmail,
  adresseLocale,
  nombreEmployes,
  onPrev
}) => {
  const [photoTravail, setPhotoTravail] = useState(null);
  const [dateTravail, setDateTravail] = useState('');
  const [titrTravail, setTitreTravail] = useState('');
  const [description2, setDescription2] = useState('');
  const [specialitesEtape3, setSpecialitesEtape3] = useState([{ titre: '', texteDescriptif: '' }]);
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const image = e.target.files[0];
    setPhotoTravail(image);
  };

  const handleDateChange = (e) => {
    setDateTravail(e.target.value);
  };

  const handleTitreChange = (e) => {
    setTitreTravail(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription2(e.target.value);
  };

  const handleSpecialiteChangeEtape3 = (index, field, value) => {
    const newSpecialites = [...specialitesEtape3];
    newSpecialites[index][field] = value;
    setSpecialitesEtape3(newSpecialites);
  };

  const addSpecialiteEtape3 = () => {
    setSpecialitesEtape3([...specialitesEtape3, { titre: '', texteDescriptif: '' }]);
  };

  const removeSpecialiteEtape3 = (index) => {
    const newSpecialites = specialitesEtape3.filter((_, i) => i !== index);
    setSpecialitesEtape3(newSpecialites);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const achevementArray = [
      {
        dateTravail: dateTravail,
        titrTravail: titrTravail,
        description2: description2
      }
    ];

    const dataEntreprise = {
      nomEntreprise: nomEntreprise,
      secteurActivite: secteurActivite,
      description: description,
      nomResponsable: nomResponsable,
      numeroEntreprise: numeroEntreprise,
      adresseEmail: adresseEmail,
      adresseLocale: adresseLocale,
      nombreEmployes: nombreEmployes,
      achevement: achevementArray,
      specialites: specialitesEtape3 // Ajouter les spécialités de l'étape 3
    };

    try {
      const response = await axios.post(
        'http://127.0.0.1:5050/api/entreprise/create',
        dataEntreprise,
        { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      console.log('Réponse de création d\'entreprise:', response.data);
      navigate('/felicitation');
    } catch (error) {
      console.log("Erreur lors de la création de l'entreprise :", error);
    }
  };

  return (
    <>
      <Header />
      <div className='f3Page'>
        <h2>Activité de l'entreprise</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <label>
            Photo du travail achevé:
            <input type="file" accept="image/*" onChange={handlePhotoChange} required />
          </label>
          <label>
            Titre de travail:
            <input type="text" value={titrTravail} onChange={handleTitreChange} required />
          </label>
          <label>
            Date de travail:
            <input type="date" value={dateTravail} onChange={handleDateChange} required />
          </label>
          <label>
            Description:
            <textarea value={description2} onChange={handleDescriptionChange} required />
          </label>
          <h3>Spécialités</h3>
          {specialitesEtape3.map((specialite, index) => (
            <div key={index} className="specialite">
              <label>
                Titre:
                <input
                  type="text"
                  value={specialite.titre}
                  onChange={(e) => handleSpecialiteChangeEtape3(index, 'titre', e.target.value)}
                  required
                />
              </label>
              <label>
                Texte Descriptif:
                <textarea
                  value={specialite.texteDescriptif}
                  onChange={(e) => handleSpecialiteChangeEtape3(index, 'texteDescriptif', e.target.value)}
                  required
                />
              </label>
              <button type="button" onClick={() => removeSpecialiteEtape3(index)}>Supprimer</button>
            </div>
          ))}
          <button type="button" onClick={addSpecialiteEtape3}>Ajouter une spécialité</button>
          <button type="button" onClick={onPrev}>Précédent</button>
          <button type="submit">Soumettre</button>
        </form>
      </div>
    </>
  );
};

export default FormulaireEtape3;
