import React from 'react';
import "./homeUser.css";
import work from "../../assets/work.jpg";
import imgLogo from '../../assets/logoClear.png';

const HomeUser = () => {
  return (
    <div className='homeUser'>
        <div className='souNavbar'>
            <div className='quiSontNous' data-aos="fade-right" data-aos-duration="1000">
              <h1 className='welcomeTitre'><span className='animated-title'>BIENVENUE</span> à nos fidèles clients !</h1>
                <h2 className='textSouNavbar'>En résumé, l'entretien domestique se traduit par des économies en réparant les dommages qui en découlent. En tant que Société Tunisienne d'Entretien de l'Habitation, nous offrons des services exceptionnels visant à résoudre efficacement toutes les pannes et difficultés éventuelles. Nous valorisons la satisfaction du client, ce qui nous motive à fournir un service de qualité supérieure. Notre priorité est de résoudre durablement et en toute sécurité les problèmes de maintenance que vous rencontrez. Nous intervenons tant dans les résidences que dans les entreprises en Tunisie. Notre équipe technique et notre service client sont disponibles 24 heures sur 24, sept jours sur sept.</h2>
            </div>
            <div className='ourLogo' data-aos="fade-left" data-aos-duration="1000">
                <img src={imgLogo} alt='logo '/>
            </div>
        </div>


    </div>
  )
}

export default HomeUser