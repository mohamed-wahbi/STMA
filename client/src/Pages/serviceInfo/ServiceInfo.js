import React, { useEffect, useState } from 'react';
import './serviceInfo.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import agence from '../../assets/agance.png';
import Header from '../../components/header/Header';
import Entreprise from '../Dashboard/entreprise/Entreprise';

const ServiceInfo = () => {
    const [entreprisesBySecteur, setEntreprisesBySecteur] = useState([]);
    const [serviceInfo, setServiceInfo] = useState({});
    const [ratings, setRatings] = useState({});

    const params = useParams();
    const idService = params.id;
    const secteurChoisi = serviceInfo.titreService;

    useEffect(() => {
        getOneService(idService);
    }, [idService]);

    useEffect(() => {
        if (secteurChoisi) {
            getEntreprisesBySecteur(secteurChoisi);
        }
    }, [secteurChoisi]);

    const getEntreprisesBySecteur = async (secteur) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5050/api/entreprise/getEntreprisesBySecteur/${secteur}`);
            setEntreprisesBySecteur(response.data.EntreprisesBySecteur);
            const ratingsData = {};
            response.data.EntreprisesBySecteur.forEach((item) => {
                ratingsData[item._id] = item.publicRatting;
            });
            setRatings(ratingsData);
        } catch (error) {
            console.log('Erreur lors de la récupération des entreprises !', error);
        }
    };

    const getOneService = async (id) => {
        try {
            const response = await axios.get(`http://127.0.0.1:5050/api/service/getOne/${id}`);
            setServiceInfo(response.data.service);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Header />
            <div className='serviceInfoTitre'>
                <h2 data-aos="fade-up-right" data-aos-delay="500">Bienvenue chez nous !</h2>
                <br />
                <b data-aos="fade-up-left" data-aos-delay="1000">
                    STMA vous offre une gamme de services à domicile pour simplifier vos tâches quotidiennes, assurés par une équipe professionnelle et dynamique spécialisée dans divers domaines notamment le service de {serviceInfo.titreService} dont voici les détails :
                </b>
            </div>

            <div className='serviceInfoComponent' data-aos="zoom-in" data-aos-delay="1500">
                <h3 className='serviceTitre'>
                    {serviceInfo.titreService} <span><i className={serviceInfo.icon}></i></span>
                </h3>
                <b className='serviceDescription'>{serviceInfo.descriptionService}</b>
            </div>

            <div className='equipeService'>
                <h3>Voici nos différentes équipes de service de {serviceInfo.titreService}</h3>
                <div className='cardEntreprise'>
                    {entreprisesBySecteur.length > 0 ? (
                        entreprisesBySecteur.map((entreprise, index) => (
                            <div key={index} className='aganceCard' data-aos="flip-up">
                                <img src={agence} alt='icon Agence' />
                                <h5><i>{entreprise.nomEntreprise}</i></h5>
                                <i>{entreprise.description}</i><br />
                                <b>{entreprise.secteurActivite}</b><br />
                                <div className='starComponent'>
                                {[...Array(5)].map((_, starIndex) => (
                                    <label key={starIndex}>
                                        <FaStar
                                            color={starIndex < (ratings[entreprise._id] || 0) ? "yellow" : "gray"}
                                            className='star'
                                            size={30}
                                        />
                                    </label>
                                ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>N'avons pas encore d'entreprise avec cette spécialité !</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceInfo;
