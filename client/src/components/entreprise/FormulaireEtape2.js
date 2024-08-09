import React from 'react';
import './form2.css';
import Header from '../header/Header';

const FormulaireEtape2 = ({ onNext, onPrev, nomResponsable, setNomResponsable, numeroEntreprise, setNumeroEntreprise, adresseEmail, setAdresseEmail, adresseLocale, setAdresseLocale, nombreEmployes, setNombreEmployes }) => {

  const handleNomChange = (e) => {
    setNomResponsable(e.target.value);
  };

  const handleNumeroChange = (e) => {
    setNumeroEntreprise(e.target.value);
  };

  const handleEmailChange = (e) => {
    setAdresseEmail(e.target.value);
  };

  const handleAdresseChange = (e) => {
    setAdresseLocale(e.target.value);
  };

  const handleNombreChange = (e) => {
    setNombreEmployes(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <>
      <Header />
      <div className='f2Page'>
        <h2>Information generale sur le responsable </h2>
        <form onSubmit={handleSubmit} className="form-container">
          <label>
            Nom du responsable:
            <input type="text" value={nomResponsable} onChange={handleNomChange} required />
          </label>
          <label>
            Numéro de l'entreprise:
            <input type="text" value={numeroEntreprise} onChange={handleNumeroChange} required />
          </label>
          <label>
            Adresse e-mail:
            <input type="email" value={adresseEmail} onChange={handleEmailChange} required />
          </label>
          <label>
            Adresse locale:
            <input type="text" value={adresseLocale} onChange={handleAdresseChange} required />
          </label>
          <label>
            Nombre d'employés:
            <input type="number" value={nombreEmployes} onChange={handleNombreChange} required />
          </label>
          <button type="button" onClick={onPrev}>Précédent</button>
          <button type="submit">Suivant</button>
        </form>
      </div>
    </>
  );
};

export default FormulaireEtape2;
