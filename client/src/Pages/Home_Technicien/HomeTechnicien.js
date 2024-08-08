import React, { useEffect, useState } from 'react';
import "./homeTechnicien.css";
import { Link, useNavigate } from 'react-router-dom';
import validateToken from '../../validator/TokenValidator';
import axios from 'axios';
import SideBarTech from './SideBarTech/SideBarTech';
import NavBarTech from './NavBarTech/NavBarTech.js';
import Dashboard from './Dashboard/Dashboard.js';
import AlarmComponent from './AlarmComponent/AlarmComponent.js';
import BesoinConfTable from './besoinConfTable/BesoinConfTable.js';
import ContractForm from './cahierDesCharge/ContractForm.js';
import ContractList from './contractList/ContractList.js';
import DiagrameStatistique from '../../components/DiagrammesStatistique/DiagrameStatistique.js'

const HomeTechnicien = () => {
  const [serviceConfirmer, setServiceConfirmer] = useState([]);
  const [pageTech, setPageTech] = useState('dashboard');
  const [showContractForm, setShowContractForm] = useState(false);

  // Token Validator
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [isTechnicien, setIsTechnicien] = useState(false);

  useEffect(() => {
    const isValidToken = validateToken(token);
    if (token) {
      setIsTechnicien((JSON.parse(atob(token.split('.')[1])).isTechnicien));
      console.log(isTechnicien);
    }
    if (!isValidToken && token == null) {
      localStorage.removeItem("token");
      navigate("/");
    }
    getConfServices();
  }, []);

  // Get All Confirmed Services
  const getConfServices = async () => {
    try {
      const servicesConfirmed = await axios.get('http://127.0.0.1:5050/api/user/service/getAllConfirmedService', {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      console.log(servicesConfirmed.data);
      setServiceConfirmer(servicesConfirmed.data.usersAvecConfirmedService);
    } catch (error) {
      console.log('error lors de la fetching des services confirmer !', error);
    }
  };

  const [contracts, setContracts] = useState([]);

  const addContract = (contract) => {
    setContracts([...contracts, contract]);
  };

  const deleteContract = (index) => {
    setContracts(contracts.filter((_, i) => i !== index));
  };

  const toggleContractForm = () => {
    setShowContractForm(!showContractForm);
  };

  return (
    <div className='TechnicienPage'>
      <SideBarTech setPageTech={setPageTech} />

      <div className='mainTechnicien'>
        <NavBarTech />
        <div className='techMainContent'>
          {pageTech === "dashboard" && <div><DiagrameStatistique /></div>}
          {pageTech === "client" && <div><Dashboard serviceConfirmer={serviceConfirmer} /></div>}
          {pageTech === "alarm-table" && <AlarmComponent />}

          {pageTech === "cahier-des-charge" && (
            <div>
              <button onClick={toggleContractForm} className="animated-button">
                {showContractForm ? "Fermer le Cahier des Charges" : "Créer un Cahier des Charges"}
              </button>
              {showContractForm && <ContractForm addContract={addContract} setShowContractForm={setShowContractForm} />}
              <ContractList contracts={contracts} deleteContract={deleteContract} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeTechnicien;
