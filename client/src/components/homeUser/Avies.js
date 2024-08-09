import React, { useEffect, useState } from "react";
import imgProfile from "../../assets/profile/profileTof.webp";
import axios from "axios";

const Avies = () => {
  const [AviesDatas, setAviesDatas] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [avieText, setAvieText] = useState("");
  const [photo, setPhoto] = useState(null);
  


  useEffect(() => {
    featchAviesChecked();
  }, []);

  const featchAviesChecked = async () => {
    try {
      const aviesData = await axios.get(
        `http://127.0.0.1:5050/api/avie/getCheckedAvies`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAviesDatas(aviesData.data.avies);
      console.log(aviesData.data.avies[0].userId.profilePhoto[0].url)//url de limage 
      
      console.log(AviesDatas.map((item1)=>{
        console.log(item1.userId.profilePhoto.map((item2)=>{
          console.log(item2.url)
        }))
      }))
    } catch (error) {
      console.log("error lors de la featching des avies !", error);
    }
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

      const formDataPhoto = new FormData();
      formDataPhoto.append('photo',photo);

      const sendPhotoToDb = await axios.post(
        `http://127.0.0.1:5050/api/avie/create/image`,
        formDataPhoto,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      setPhoto(null);

     
      


      await axios.post(
        `http://127.0.0.1:5050/api/avie/create`,
        { avieText: avieText },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(photo)
      setAvieText("");
      setFormVisible(false); // Fermer le formulaire après la soumission
      featchAviesChecked(); // Rafraîchir la liste des avies après la soumission
      alert('Votre avis bien recus ! Merci chere client .')
      window.location.reload();
    } catch (error) {
      console.log("error lors de l'envoie de l'avie aux admins !", error);
    }
  };


  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };



  return (
    <div className="aviesComponentFather">
      <h3 className="titreAvies">Vos Avies :</h3>

      <div className="creeAvieComponent">
        <button onClick={toggleForm}>Crée Votre Avie</button>
        <div className={`FormCreeAvie ${formVisible ? "active" : ""}`}>
          <form onSubmit={handleSubmit}>
            <div className="textAvie">
              <label>Crée votre avie :</label>
              <textarea
                value={avieText}
                onChange={(e) => setAvieText(e.target.value)}
              />
            </div>
            <div className="photoAvie">
              <label>Importer Votre Photo :</label>
              <input type="file" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className="btnSendAvie">
              <button type="submit">Send-Avie</button>
            </div>
          </form>
        </div>
      </div>

      <div className="aviesComponent" data-aos="fade-up" data-aos-duration="1000">
        {AviesDatas &&
          AviesDatas.map((item) => {
            return (
              <div className="cardAvies" key={item._id}>
                {item.userId.profilePhoto.map((item2)=>{
                  return(
                    <img src={item2.url} alt="img client" />
                  )
                })}
                <h3>
                  {" "}
                  <span>Prenom : </span> {item.userId.username}{" "}
                </h3>
                <p>
                  {" "}
                  <span>
                    <b> Avie : </b>
                  </span>{" "}
                  {item.avieText}{" "}
                </p>
                <b>
                  <span>Crée le : </span> {formatDate(item.createdAt)}{" "}
                </b>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Avies;

