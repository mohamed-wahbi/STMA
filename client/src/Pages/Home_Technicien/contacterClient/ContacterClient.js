import React, { useEffect, useState } from 'react';
import './contacterClient.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import profilImg from '../../../assets/profile/profileTof.webp'
import needsImg from '../../../assets/needCL.png'
import Footer from '../../../components/Footer/Footer';
import videoBack from '../../../assets/videoBack.mp4'
import Accordion from 'react-bootstrap/Accordion';
import work3 from '../../../assets/work3.jpg'

import Alarme from '../alarme/Alarme.js'


const ContacterClient = () => {
  const [oneUserServiseConfirmer, setOneUserServiseConfirmer] = useState([])
  const [besoinData, setBesoinData] = useState([])
  const [alarmTogel, setAlarmTogel] = useState(true)
  const [idCl,setIdCl] = useState('')

  const { id } = useParams();

  useEffect(() => {
    getOneUserServices(id)
  }, [])


  const getOneUserServices = async (id) => {
    try {
      const serviceOfOneClient = await axios.get(`http://127.0.0.1:5050/api/user/service/getConfirmedServiceById/${id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      // console.log(serviceOfOneClient.data.userConfirmerService)
      setOneUserServiseConfirmer(serviceOfOneClient.data.userConfirmerService)
      setBesoinData(serviceOfOneClient.data.userConfirmerService.servicesChoisis)
      setIdCl(serviceOfOneClient.data.userConfirmerService.id)
      // console.log(serviceOfOneClient.data.userConfirmerService.servicesChoisis)

    } catch (error) {
      console.log("error lors de la featching des services client", error)
    }
  }

console.log(idCl)


  return (
    <div>
      <div className='aboutClient'>

        <div className='headerContactClient' >

          <h3 className='headerContactClientH3' data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">Contacter Client</h3>
          <p className='headerContactClientP' data-aos="fade-left" data-aos-duration="1000" data-aos-delay="800">Contactez vos clients et planifiez un rendez-vous pour créer un cahier des charges détaillé et précis</p>
          <hr />

          <div className='infosClient' data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000">
            <img src={profilImg} alt='tof client' data-aos="zoom-in-down" data-aos-duration="1000" data-aos-delay="1200" />
            <div className='infos' data-aos="zoom-in-up" data-aos-duration="1000" data-aos-delay="1200">
              <div><b>Nom :</b> <span> {oneUserServiseConfirmer.name} </span></div>
              <div><b>id :</b> <span> {oneUserServiseConfirmer.id} </span></div>
              <div><b>EMAIL :</b> <span>{oneUserServiseConfirmer.email}</span></div>
              <div><b>Numero Tel :</b> <span>{oneUserServiseConfirmer.numTel}</span></div>
            </div>
          </div>

        </div>



        <div className='besoinComponent'>
          <h3 data-aos="zoom-in-up" data-aos-duration="1000" data-aos-delay="200">Besoins Client</h3>
          <div className='besoinComponent1'>


{/* _________________________________________________________________ */}




           <div className='besoinComponent1Data'>
              {
                besoinData.map((item, index) => {
                  return (
                    <div className='cardBesoin' data-aos="flip-left" data-aos-duration="1000" data-aos-delay="500">
                      <h4>Besoin Numero {index} </h4>
                      <div className='elementBesoin'> <b>Localisation :</b> <span> {item.adresse}</span> </div>

                     
                       <div className='elementBesoin'> <b>Secteur :</b> <span> {item.serviceId.titreService}</span> </div>
                       

                      {item.besoins.map(item => {
                        return (
                          <div>

                            <div className='elementBesoin'> <b>Description :</b> <span> {item.texte} </span> </div>

                            {item.images.map((item1) => {
                              return (
                                <div className='imageBesoin'>

                                  <img src={work3} alt='icon' />
                                </div>
                              )
                            })}

                          </div>

                        )
                      })}


                    </div>
                  )
                })
              }  


              <div className='apelClComponent' data-aos="zoom-in-down" data-aos-duration="1000" data-aos-delay="800" data-aos-once="true">
                <p >Appele <span className=''> {oneUserServiseConfirmer.name}</span> et confirmer un rendez-vous ! </p>
                <a href={`tel:${oneUserServiseConfirmer.numTel}`} className='aLink'>+216 {oneUserServiseConfirmer.numTel} <i class="bi bi-telephone-forward-fill"></i></a>
              </div>

            </div>  















{/* _______________________________________________ */}






            <div className='besoinComponent1Img'>

              <img src={needsImg} alt='icon' />

              <div onClick={() => setAlarmTogel(!alarmTogel)} className='alarmBtn' data-aos="zoom-in-down" data-aos-duration="800" data-aos-delay="800" data-aos-once="true">  
                
                  {!alarmTogel?<><h6>Programer Alarme</h6> <i class="bi bi-caret-up-square" style={{fontSize:"30px"}}></i> </> :<><h6>Fermer Alarme</h6> <i class="bi bi-caret-down-square-fill" style={{fontSize:"30px"}}></i> </> }
                
              </div>
            </div>

          </div>

        </div>















        {alarmTogel ? 
        <div className='configAlarm'>

          <video autoPlay loop muted className="background-video">
            <source src={videoBack} type="video/mp4" />
          </video>

          <div className="content">
            {/* Ajoutez le contenu de votre élément ici */}
            <h3>Configuration de l'Alarme</h3>

            <div className='alarmForm'>
              <Alarme idCl={idCl}/>
            </div>
            <div className='alarmConfMessage'></div>
            

          </div>

        </div>
         : null}



      </div>

    </div>

  );
};

export default ContacterClient;
