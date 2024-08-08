import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Fuse from 'fuse.js';
import {Link} from 'react-router-dom'

const Search = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [allServices, setAllServices] = useState([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const servicesData = await axios.get(
                "http://127.0.0.1:5050/api/service/getAll"
            );
            console.log(servicesData.data)
            setAllServices(servicesData.data.services);
        } catch (error) {
            console.log("error lors de la fetching des services !", error);
        }
    };


    const fuse = new Fuse(
        allServices,
        {
            keys: ['titreService'], // Les champs sur lesquels effectuer la recherche
            includeScore: true,
            threshold: 0.5,
        }

    );


    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const results = fuse.search(e.target.value);
        setSearchResults(results.map(result => result.item));
    };



    return (
        <div className='searchBar'>

            <div className='searchContent'>

                <i class="bi bi-search"></i>
                <input
                    type="text"
                    placeholder="Rechercher un service..."
                    value={searchTerm}
                    onChange={handleSearch}
                />

            </div> 




{searchResults.length>0 ?


<div className='services123'>
                <ul className='serviceList'>
                    {searchResults.map(service => (
                        <li key={service.id}>
                            <Link to={`/servicePageInfo/${service._id}`} className='linkServiceInfo'>
                            
                                <p>{service.titreService}  </p>

                            </Link>
                        </li>
                    ))}
                </ul>
            </div> : null



}


            

        </div>
    )
}

export default Search
