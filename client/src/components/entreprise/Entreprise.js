import React, { useState } from 'react'
import Header from '../header/Header'
import { Link } from 'react-router-dom'
import './entreprise.css'

const Entreprise = () => {
  const [userInfos,setUserInfos] = useState([]);
  const [aEntreprise,setAEntreprise] = useState(false)
  
  return (
    <div>
        <Header aEntreprise={aEntreprise} />
        <div className='componentInfos'>

            <div className='headerEntreprise'>
                <h2>Bienvenue sur STMA !</h2>
                <p> Notre plateforme vous offre tous les outils nécessaires pour concrétiser votre projet entrepreneurial en quelques clics </p>
                <Link className='createEntrprise ' to={'/entrepriseRegister'}>
                    <button>CREE VOTRE ENTREPRISE</button>
                </Link>
            </div>
        </div>

        <div className='registerInfos'>
          <h2>Créez Votre Entreprise en Quelques Étapes Simples</h2>
          <div className='registerEtap'>
            <div className='etape' data-aos="fade-right" data-aos-once="true" data-aos-duration="1000">
              <h4>1</h4>
              <b>Information generale sur l'entreprise :</b>
              <i class="bi bi-info-circle" ></i>           
               </div>
            <div className='etape' data-aos="flip-down" data-aos-once="true" data-aos-duration="1000">
            <h4>2</h4>

              <b>Information generale sur le responsable :</b>
              <i class="bi bi-person-check"></i>
                          </div>
            <div className='etape' data-aos="fade-left" data-aos-once="true" data-aos-duration="1000">
            <h4>3</h4>

              <b>Activiter de l'entreprise :</b>
              <i class="bi bi-activity"></i>            
              </div>
          </div>
        </div>


        <div className="benefits-section" data-aos="flip-down" data-aos-once="true" data-aos-duration="1500">
          <h3>Les avantages de rejoindre les services de STMA </h3>
          <ul>
            <li> STMA est une plateforme de services à domicile très connue.</li>
            <hr/>
            <li>STMA offre la chance aux petites entreprises de profiter de ses connaissances et de sa bonne réputation sur le marché.</li>
            <hr/>
            <li>STMA offre des opportunités d'emploi pour les petites entreprises grâce à ses relations établies.</li>
            <hr/>
            <li>STMA fournit un soutien professionnel et des ressources pour aider les entreprises à prospérer.</li>
          </ul>
        </div>

    </div>
  )
}

export default Entreprise
