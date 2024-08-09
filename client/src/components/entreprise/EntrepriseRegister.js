import React, { useState } from 'react';
import FormulaireEtape1 from './FormulaireEtape1';
import FormulaireEtape2 from './FormulaireEtape2';
import FormulaireEtape3 from './FormulaireEtape3';

const EntrepriseRegister = () => {

  const [nomEntreprise, setNomEntreprise] = useState('');
  const [logoEntreprise, setLogoEntreprise] = useState(null); // Pour l'image
  const [secteurActivite, setSecteurActivite] = useState('1');
  const [description, setDescription] = useState('');

  const [nomResponsable, setNomResponsable] = useState('');
  const [numeroEntreprise, setNumeroEntreprise] = useState();
  const [adresseEmail, setAdresseEmail] = useState('');
  const [adresseLocale, setAdresseLocale] = useState('');
  const [nombreEmployes, setNombreEmployes] = useState();

  const [photoTravail, setPhotoTravail] = useState(null); // Pour l'image
  const [dateTravail, setDateTravail] = useState('');
  const [titrTravail, setTitreTravail] = useState('');
  const [description2, setDescription2] = useState('');

  const [serveces, setServeces] = useState([]);
  const [specialites, setSpecialites] = useState([{ titre: '', texteDescriptif: '' }]);

  const [etape, setEtape] = useState(1);

  const handleNext = () => {
    setEtape(etape + 1);
  };

  const handlePrev = () => {
    setEtape(etape - 1);
  };

  return (
    <div>
       <div>
          {etape === 1 && <FormulaireEtape1 onNext={handleNext} 
                  nomEntreprise={nomEntreprise}  
                  logoEntreprise={logoEntreprise}  
                  secteurActivite={secteurActivite}  
                  description={description}  
                  setNomEntreprise={setNomEntreprise}  
                  setLogoEntreprise={setLogoEntreprise}  
                  setSecteurActivite={setSecteurActivite}  
                  setDescription={setDescription}
                  serveces={serveces}
                  specialites={specialites}
                  setServeces={setServeces}
                  setSpecialites={setSpecialites}
          />}
          {etape === 2 && <FormulaireEtape2 onNext={handleNext} onPrev={handlePrev}
                  nomResponsable={nomResponsable}  
                  numeroEntreprise={numeroEntreprise}  
                  adresseEmail={adresseEmail}  
                  adresseLocale={adresseLocale}  
                  nombreEmployes={nombreEmployes}  
                  setNomResponsable={setNomResponsable}  
                  setNumeroEntreprise={setNumeroEntreprise}  
                  setAdresseEmail={setAdresseEmail}  
                  setAdresseLocale={setAdresseLocale} 
                  setNombreEmployes={setNombreEmployes} 
          />}
          {etape === 3 && <FormulaireEtape3 onPrev={handlePrev}
                  nomEntreprise={nomEntreprise}
                  secteurActivite={secteurActivite}
                  description={description}
                  nomResponsable={nomResponsable}
                  numeroEntreprise={numeroEntreprise}
                  adresseEmail={adresseEmail}
                  adresseLocale={adresseLocale}
                  nombreEmployes={nombreEmployes}
                  photoTravail={photoTravail}
                  dateTravail={dateTravail}
                  titrTravail={titrTravail}
                  description2={description2}
                  serveces={serveces}
                  specialites={specialites}
                  setPhotoTravail={setPhotoTravail}
                  setDateTravail={setDateTravail}
                  setTitreTravail={setTitreTravail}
                  setDescription2={setDescription2}
                  logoEntreprise={logoEntreprise}  
          />}
       </div>
    </div>
  );
}

export default EntrepriseRegister;
