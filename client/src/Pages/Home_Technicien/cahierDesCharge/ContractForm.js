import React, { useState } from 'react';
import './cahierCh.css'

const ContractForm = ({ addContract ,setShowContractForm}) => {
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [projectSector, setProjectSector] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [functionalRequirements, setFunctionalRequirements] = useState([{ title: '', description: '' }]);
  const [nonFunctionalRequirements, setNonFunctionalRequirements] = useState([{ title: '', description: '' }]);
  const [deadlines, setDeadlines] = useState('');
  const [price, setPrice] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [technicianName, setTechnicianName] = useState('');

  const handleFunctionalRequirementChange = (index, event) => {
    const values = [...functionalRequirements];
    values[index][event.target.name] = event.target.value;
    setFunctionalRequirements(values);
  };

  const handleNonFunctionalRequirementChange = (index, event) => {
    const values = [...nonFunctionalRequirements];
    values[index][event.target.name] = event.target.value;
    setNonFunctionalRequirements(values);
  };

  const handleAddFunctionalRequirement = () => {
    setFunctionalRequirements([...functionalRequirements, { title: '', description: '' }]);
  };

  const handleAddNonFunctionalRequirement = () => {
    setNonFunctionalRequirements([...nonFunctionalRequirements, { title: '', description: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addContract({
      clientName,
      clientAddress,
      phoneNumber,
      email,
      projectSector,
      projectTitle,
      projectDescription,
      functionalRequirements,
      nonFunctionalRequirements,
      deadlines,
      price,
      companyName,
      technicianName,
      date: new Date(),
    });
    // Reset form fields
    setClientName('');
    setClientAddress('');
    setPhoneNumber('');
    setEmail('');
    setProjectSector('');
    setProjectTitle('');
    setProjectDescription('');
    setFunctionalRequirements([{ title: '', description: '' }]);
    setNonFunctionalRequirements([{ title: '', description: '' }]);
    setDeadlines('');
    setPrice('');
    setCompanyName('');
    setTechnicianName('');
    setShowContractForm(false)
  };

  return (
    <div className='formCahierCH'>
      <h3>Formulaire De Creation Du Cahier Des Charges</h3>
    <form onSubmit={handleSubmit} className="contract-form">
      <div className="form-group">
        <label>Nom et Prénom du Client:</label>
        <input 
          type="text" 
          value={clientName} 
          onChange={(e) => setClientName(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Adresse:</label>
        <input 
          type="text" 
          value={clientAddress} 
          onChange={(e) => setClientAddress(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Numéro de Téléphone:</label>
        <input 
          type="tel" 
          value={phoneNumber} 
          onChange={(e) => setPhoneNumber(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Secteur du Projet:</label>
        <input 
          type="text" 
          value={projectSector} 
          onChange={(e) => setProjectSector(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Titre du Projet:</label>
        <input 
          type="text" 
          value={projectTitle} 
          onChange={(e) => setProjectTitle(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Description du Projet:</label>
        <textarea 
          value={projectDescription} 
          onChange={(e) => setProjectDescription(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Besoins Fonctionnels:</label>
        {functionalRequirements.map((requirement, index) => (
          <div key={index} className="requirement-group">
            <input 
              type="text"
              name="title"
              placeholder="Titre"
              value={requirement.title}
              onChange={(event) => handleFunctionalRequirementChange(index, event)}
              required={index === functionalRequirements.length - 1} // requis seulement pour le dernier ajouté
            />
            <textarea 
              name="description"
              placeholder="Description"
              value={requirement.description}
              onChange={(event) => handleFunctionalRequirementChange(index, event)}
              required={index === functionalRequirements.length - 1} // requis seulement pour le dernier ajouté
            />
          </div>
        ))}
        <button type="button" onClick={handleAddFunctionalRequirement}>Ajouter un besoin fonctionnel</button>
      </div>
      <div className="form-group">
        <label>Besoins Non Fonctionnels:</label>
        {nonFunctionalRequirements.map((requirement, index) => (
          <div key={index} className="requirement-group">
            <input 
              type="text"
              name="title"
              placeholder="Titre"
              value={requirement.title}
              onChange={(event) => handleNonFunctionalRequirementChange(index, event)}
              required={index === nonFunctionalRequirements.length - 1} // requis seulement pour le dernier ajouté
            />
            <textarea 
              name="description"
              placeholder="Description"
              value={requirement.description}
              onChange={(event) => handleNonFunctionalRequirementChange(index, event)}
              required={index === nonFunctionalRequirements.length - 1} // requis seulement pour le dernier ajouté
            />
          </div>
        ))}
        <button type="button" onClick={handleAddNonFunctionalRequirement}>Ajouter un besoin non fonctionnel</button>
      </div>
      <div className="form-group">
        <label>Délais:</label>
        <input 
          type="text" 
          value={deadlines} 
          onChange={(e) => setDeadlines(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Prix:</label>
        <input 
          type="text" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
          // Ajoutez une validation pour le format du prix si nécessaire
        />
      </div>
      <div className="form-group">
        <label>Nom de l'Entreprise:</label>
        <input 
          type="text" 
          value={companyName} 
          onChange={(e) => setCompanyName(e.target.value)} 
          required 
        />
      </div>
      <div className="form-group">
        <label>Nom du Technicien:</label>
        <input 
          type="text" 
          value={technicianName} 
          onChange={(e) => setTechnicianName(e.target.value)} 
          required 
        />
      </div>
      {/* Supprimez le champ suivant s'il est redondant avec "Nom et Prénom du Client" */}
      {/* <div className="form-group">
        <label>Nom du Client (pour la signature):</label>
        <input 
          type="text" 
          value={clientName} 
          onChange={(e) => setClientName(e.target.value)} 
          required 
        />
      </div> */}
      <button className='button' type="submit">Créer le Contrat</button>
    </form>
    </div>
  );
};

export default ContractForm;
