import React, { useEffect, useState } from 'react';
import './voirAlarmDetails.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import entrepriseImg from '../../../../assets/entrepriseImg.jpg'

import fb from '../../../../assets/sosialMedia/fbIcon.png'
import insta from '../../../../assets/sosialMedia/instaIcon.png'
import whats from '../../../../assets/sosialMedia/whatsIcon.png'
import person from '../../../../assets/sosialMedia/person2.png'

const VoirAlarmDetails = () => {
  const [oneUserServiseConfirmer, setOneUserServiseConfirmer] = useState({})
  const [besoinData, setBesoinData] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()



  useEffect(() => {
    getOneUserServices(id)
  }, [])


  const getOneUserServices = async (id) => {
    try {
      const serviceOfOneClient = await axios.get(`http://127.0.0.1:5050/api/user/service/getConfirmedServiceById/${id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      console.log(serviceOfOneClient.data.userConfirmerService)
      setOneUserServiseConfirmer(serviceOfOneClient.data.userConfirmerService)
      setBesoinData(serviceOfOneClient.data.userConfirmerService.servicesChoisis)
      console.log(besoinData.adresse)
    } catch (error) {
      console.log("error lors de la featching des services client", error)
    }
  }


  const reternlastPage = ()=>{
    navigate("/homeTechnicien")
  }


  return (
    <div className='voirAlarmDetail'>

      <button style={{background:"#403d3d"}} onClick={reternlastPage}><i class="bi bi-caret-left"></i> Retour</button>
      <hr/>

      <div className='clientInfo'>


        <div className='clientInfoLeft'>
          <div className='clientTof'>
            <img src={person} alt='icon' />
          </div>

          <div className='clientInfoContact'>
            <div className='clInfos'>
              <div>
                <p>Nom : {oneUserServiseConfirmer.name}</p>
              </div>
              <div>
                <p>Email : {oneUserServiseConfirmer.email}</p>
              </div>
              <div>
                <p>numTel : {oneUserServiseConfirmer.numTel}</p>
              </div>
            </div>

            <div className='clSocialMedia'>
                <img src={fb} alt='icon' width={45} />
                <img src={insta} alt='icon' width={60} />
                <img src={whats} alt='icon' width={60} />
                
            </div>
          </div>



        </div>
        <div className='clientInfoRight'>
          <div className='clientInfoRight1'></div>
          <div className='clientInfoRight2'>
            <button className='btnAppeler'><i class="bi bi-telephone"></i> Appeler</button>
            <button className='btnCreeBesoin'><i class="bi bi-card-checklist"></i> Crée Besoin</button>
          </div>
        </div>

      </div>

      <hr/>

      <div className='serviceBesoinCl'>
        <h3 className='titre'>Les Besoins Clients De Nos Services</h3>


        <div className='cardsBesoinCL'>

          {
            besoinData.map((item)=>{
              return(
                <div className='cardBesoinCl'>
                  <div className='stmaServ'>
                    <h5>STMA </h5>
                    <b> {item.serviceId.titreService} </b> <span><i className={item.serviceId.icon}></i></span>
                    <p> {item.serviceId.descriptionService}  </p>
                  </div>
                  <div className='clServ'>
                    <h5>Besoin Du Client</h5>
                    <div className='clServBesoin'>
                      <b>Localisation : {item.adresse} </b>
                      {
                        item.besoins.map((item)=>{
                          return(
                            <div className='bsCard'>
                              <div className='bsTitre'> <b>Text Besoin : </b> {item.texte} </div>
                              <div className='bsImg'>
                                {item.images.map((item)=>{
                                  return(
                                    <img src={entrepriseImg} alt='icon' />
                                  )
                                })}
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    

                    
                  </div>



                </div>
              )
            })
          }

           

        </div>
      
          
      

        
      
      
      
      </div>

      


          <div className='rapellTech'>
            <h3>
              Reppele Technique Sur Les Services De {besoinData.map((item)=>{
                return(
                  <span><b> {item.serviceId.titreService} </b> <span><i className={item.serviceId.icon}></i></span></span>
                )
              })}
            </h3>
          </div>

    </div>
  )
}

export default VoirAlarmDetails
