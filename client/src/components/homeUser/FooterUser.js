import React from 'react';
import {Link} from 'react-router-dom';
import roulou from '../../assets/roulou.png'

const FooterUser = () => {
  return (
    <div className='footerUser'>
        <div className='footerTitre'>
            <h1>Besoin de savoir plus ?</h1>
        </div>
        <div className='contactUs'>
            <Link to="/contact" className='contactUsLink'><i class="bi bi-telephone-forward-fill"></i> Contact-Us</Link>
        </div>
        <div className='mapAndObjectifs'>
        <div className='footerMap' data-aos="flip-left" data-aos-duration="1000">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26552.554574007845!2d8.950862934765608!3d33.70715510000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12566e541bcc6359%3A0x79fc96a6bcfd0b81!2sKebili!5e0!3m2!1sfr!2stn!4v1709768532667!5m2!1sfr!2stn" width="600" height="550" style={{border:'0px'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div className='footerObjectifs' data-aos="flip-right" data-aos-duration="1000">
            <h1>NOS OBJECTIFES :</h1>
            <div className='objectifText'>
            Les objectifs de la société de maintenance se déclinent dans divers domaines afin d'assurer la pleine satisfaction du client et une réussite à long terme. Dans un premier temps, l'entreprise aspire à offrir à ses clients des services de maintenance de qualité supérieure, englobant la réparation efficace et rapide des pannes ainsi que la proposition de solutions durables. Deuxièmement, elle s'efforce de répondre aux besoins de sa clientèle par le biais d'une interaction efficace, en écoutant attentivement leurs demandes et leurs retours, et en améliorant leur expérience de service. Enfin, elle vise à instaurer des relations pérennes avec ses clients et la communauté locale en privilégiant l'intégrité et l'honnêteté dans la prestation de services ainsi qu'une communication efficace. 
            </div>
            <div className='contactRoulou'>
                <img src={roulou} alt='contacts ...' />
            </div>
        </div>
        </div>
        
    </div>
  )
}

export default FooterUser