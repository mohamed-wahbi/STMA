import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './company.css'
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const Company = () => {
  const [entrepriseInfo, setEntrepriseInfo] = useState({})
  const [entrepriseAchevement, setEntrepriseAchevement] = useState([])
  const [entrepriseSpecialite, setEntrepriseSpecialite] = useState([])

  useEffect(() => {
    getUserCompany()
  }, [])

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const getUserCompany = async () => {
    try {
      const userCompanyData = await axios.get('http://127.0.0.1:5050/api/entreprise/getUserCompany', {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
      })

      setEntrepriseInfo(userCompanyData.data.userCompany)
      setEntrepriseAchevement(userCompanyData.data.userCompany.achevement || [])

      setEntrepriseSpecialite(userCompanyData.data.userCompany.specialites)

    } catch (error) {
      console.log('Error fetching user company data!', error)
    }
  }

  return (
    <div>
      <div className='headerCompany'>
        <div className='logo'>
          <img src={"https://img-0.journaldunet.com/gkaamY2eBK46gLrjEzMJ-Df2iHE=/1280x/smart/df12c3d6f77445008518acae53aa34a4/ccmcms-jdn/11174895.jpg"} alt='logo' />
          <p> {entrepriseInfo.nomEntreprise} </p>
        </div>
        <div className='companyLink'>
          <ul>
            <li><Link to={'/home'}>Home</Link></li>
            
          </ul>
        </div>
      </div>

      <div className='introCompany'>
        <h3>{entrepriseInfo.secteurActivite}</h3>
        <b>{entrepriseInfo.description}</b>
      </div>


      <div className='specialiterCompany'>
        <h4>SPECIALITE :</h4>

    {
      entrepriseSpecialite.map((item,index)=>{
        return(




          
        <Accordion defaultActiveKey={index}>
          <Accordion.Item eventKey={index}>
            <Accordion.Header> {item.titre} </Accordion.Header>
            <Accordion.Body>
              {item.texteDescriptif}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      










        )
      })
    }
    </div>





      

      <div className='achevementCompany'>
        <h4>ACHEVEMENT :</h4>
        {entrepriseAchevement.map((item) => (
          <Card key={item._id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={"https://r3g.fr/wp-content/uploads/2020/05/Camera-video-surveillance-3.jpg"} />
            <Card.Body>
              <Card.Title> {item.titrTravail} </Card.Title>
              <Card.Title>{formatDate(item.dateTravail)}</Card.Title>
              <Card.Text>
                {item.description2}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className='emailCompany'>
        <h4>ENVOYER EMAIL A STMA GROUP :</h4>
        <div className='mail'>
          <div>
            <label>Objet :</label>
            <input type='text' />
          </div>
          <div>
            <label>Text :</label>
            <input type='text' />
          </div>
          <button>envoyer</button>
        </div>
      </div>

      <div className='infoCompany'>
        <div className='companyInfo'>
          <b>Nom de l'entreprise :</b>
          <p>{entrepriseInfo.nomEntreprise}</p>

          <b>Nom de responsable :</b>
          <p>{entrepriseInfo.nomResponsable}</p>

          <b>Nombre des employeurs :</b>
          <p>{entrepriseInfo.nombreEmployes}</p>

          <b>adresse mail de l'entreprise :</b>
          <p>{entrepriseInfo.adresseEmail}</p>
          <b>numero de telephone :</b>
          <p>{entrepriseInfo.numeroEntreprise}</p>
        </div>

        <div className='locationEntreprise'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26496.116952234734!2d10.082058643398254!3d33.88927733596708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12556fc5487bd237%3A0x4980e09bdb547a86!2zR2Fiw6hz!5e0!3m2!1sfr!2stn!4v1716280321960!5m2!1sfr!2stn"  style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        
      </div>

    
    </div>
  )
}

export default Company
