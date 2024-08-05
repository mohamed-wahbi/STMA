import React from 'react';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './Pages/Register_Page/Register';
import Login from './Pages/Login_Page/Login';
import Home from './Pages/Home_page/Home';
import Contact from './Pages/contact/Contact';
import HomeAdmin from './components/homeAdmin/HomeAdmin';
import Dashboard from './Pages/Dashboard/Dashboard';
import EmailButton from './Pages/Dashboard/userQestion/EmailButton';
import Entreprise from './components/entreprise/Entreprise';
import EntrepriseRegister from './components/entreprise/EntrepriseRegister';
import Felicitation from './components/entreprise/Felicitation';
import Company from './Pages/Company/Company.js';
import ServiceInfo from './Pages/serviceInfo/ServiceInfo.js';
import HomeTechnicien from './Pages/Home_Technicien/HomeTechnicien.js';
import Alarme from './Pages/Home_Technicien/alarme/Alarme.js'
import ContractForm from './Pages/Home_Technicien/cahierDesCharge/ContractForm.js'
import ContractList from './Pages/Home_Technicien/contractList/ContractList.js';
import ContacterClient from './Pages/Home_Technicien/contacterClient/ContacterClient.js';
import Footer from './components/Footer/Footer.js';
import VoirAlarmDetails from './Pages/Home_Technicien/AlarmComponent/voirAlarmDetails/VoirAlarmDetails.js';

// *****************|| admin page ||**********************


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element ={<Login />} />
        <Route path='/register' element ={<Register />} />
        <Route path='/home' element = {<Home />} />
        <Route path='/homeTechnicien' element = {<HomeTechnicien />} />
        <Route path='/contact' element = {<Contact />} />
        <Route path='/entreprise' element = {<Entreprise />} />
        <Route path='/homeadmin' element = {<HomeAdmin />} />
        <Route path='/dashboard' element = {<Dashboard />} />
        <Route path='/one-user-services/:id' element = {<EmailButton />} />
        <Route path='/entrepriseRegister' element = {<EntrepriseRegister />} />
        <Route path='/felicitation' element = {<Felicitation />} />
        <Route path='/company' element = {<Company />} />
        <Route path='/servicePageInfo/:id' element = {<ServiceInfo />} />
        <Route path='/alarme' element = {<Alarme/>} />
        <Route path='/contractForm' element = {<ContractForm/>} />
        <Route path='/contractList' element = {<ContractList/>} />
        <Route path='/contacterClient/:id' element = {<ContacterClient/>} />
        <Route path='/voirAlarmDetails/:id' element = {<VoirAlarmDetails/>} />
      
        
        
        
        

      </Routes>
      <Footer/>
    </BrowserRouter>
  
  )
}

export default App