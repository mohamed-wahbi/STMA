import React, { useEffect, useState } from 'react';
import axios from "axios";
import "../entreprise/entreprise.css"

const Entreprise = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const [ENTRconnecter, setENTRconnecter] = useState([]);
  const [ENTRNotconnecter, setENTRNotconnecter] = useState([]);

  const [nbrEconnecter,setNbrEconnecter] = useState ();
  const [nbrEnotconnecter,setNbrEnotconnecter] = useState ();
  


  useEffect(()=>{
    featchEntreprises()
  },[])


  const featchEntreprises = async()=>{
   try {
    const entreprises = await axios.get('http://127.0.0.1:5050/api/entreprise/getAllCompany',
    { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
  )

    setENTRconnecter(entreprises.data.getConnectedEntreprise)
    setENTRNotconnecter(entreprises.data.getNotConnectedEntreprise)


    setNbrEconnecter(entreprises.data.numberConnectedEntreprise)
    setNbrEnotconnecter(entreprises.data.numberNotConnectedEntreprise)
    
   console.log(entreprises.data.getConnectedEntreprise)



   } catch (error) {
    console.log('error lors de la featching entreprises !',error)
   }
  }

  return (
    <div className='EntrepriseClass'>
      <h3 className='entrepriseClassTitle'>Entreprise Connectivité :</h3>

      <div className='connectivitySituation'>
        <ul>
          <li onClick={() => setSelectedOption('online')} >Entreprise en ligne <span className='connected'>{nbrEconnecter}</span>  </li>
          <li onClick={() => setSelectedOption('offline')}>Entreprise hors ligne <span className='NotConnected'>{nbrEnotconnecter}</span></li>
        </ul>
      </div>

      {selectedOption === 'online' && (
        <div  className='connectedCompany'>
       {ENTRconnecter.map((item)=>{
        return(
              <div className='entrepriseInfo'>
                <div><b>Nom Entreprise :</b> <span> {item.nomEntreprise} </span> </div>
                <div><b>Email Entreprise :</b> <span>{item.adresseEmail}</span> </div>
                <div><b>Num Entreprise :</b> <span>{item.numeroEntreprise}</span></div>
                <div className='bolvert'></div>
              </div>
        )
       })}
        
        
       
        </div>
        
      )}

      {selectedOption === 'offline' && (
        <div className='notConnectedCompany'>
          {ENTRNotconnecter.map((item)=>{
            return(
              <div className='entrepriseInfo'>
                <div><b>Nom Entreprise :</b> <span> {item.nomEntreprise} </span> </div>
                <div><b>Email Entreprise :</b> <span>{item.adresseEmail}</span> </div>
                <div><b>Num Entreprise :</b> <span>{item.numeroEntreprise}</span></div>
                <div className='bolRouge'></div>

              </div>
            )
       })}
        </div>
      )}
    </div>
  );
};

export default Entreprise;
