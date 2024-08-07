import React, { useEffect, useState } from 'react';
import './userAvies.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import progileImg from "../../../assets/profile/profileTof.webp"
import axios from 'axios';

const  UserAvies = () => {
  const [aviesDatas, setAviesDatas] = useState([]);



  useEffect(() => {
    fetchAvies();
    
  }, []);

  const fetchAvies = async () => {
    try {
      const aviesData = await axios.get('http://127.0.0.1:5050/api/avie/getAllAvies', {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
      })
      
      console.log(aviesData.data.avies);
      setAviesDatas(aviesData.data.avies);

    } catch (error) {
      console.log("error lor de la fetching des Avies !", error);
    }
  }

  const handelDeleteAvie = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5050/api/avie/deleteAvie/${id}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setAviesDatas(aviesDatas.filter(avie => avie._id !== id)); // Mettre à jour la liste des avis après la suppression réussie
    } catch (error) {
      console.log("error lor de la deleting d'un Avie !", error);
    }
  }

  const handelUpdateIsChecked = async (id) => {
    try {
      await axios.put(`http://127.0.0.1:5050/api/avie/updateIschecked/${id}`, {}, {
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      fetchAvies();
    } catch (error) {
      console.log("error lor de la deleting d'un Avie !", error);
    }
  }

   // Fonction pour formater la date
   const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  }

  return (
    <div className='userAviesComponentFather'>
      <h3 className='titreComponentAvie'>Controle Avies :</h3>

     

      <div className='userAvieComponent'>
      {aviesDatas && aviesDatas.map((item) => {
        return (
          <Card style={{ width: '18rem' }} key={item._id}>
            {item.userId.profilePhoto.map((item2)=>{
              return (
                <Card.Img variant="top" src={item2.url}/>
              )
            })}
            <Card.Body>
              <Card.Title> Prenom : {item.userId.username} </Card.Title>
              <Card.Text> 
                <h4>Avie :</h4>
                {item.avieText}
              </Card.Text>
              <ListGroup className="list-group-flush">
                <ListGroup.Item className='createdAt'><p>Crée le :</p> {formatDate(item.createdAt)} </ListGroup.Item>
              </ListGroup>
              <div className='btnCard'>
                <Button onClick={() =>{
                  handelUpdateIsChecked(item._id);
                  }} variant="primary" style={{background :item.isChecked ? 'green' : 'red'}} >Partager</Button>
                <Button onClick={() => handelDeleteAvie(item._id)} variant="primary">Delete</Button>
              </div>
            </Card.Body>
          </Card>
        );
      })}
    </div>
    </div>
  );
}

export default UserAvies;
