import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

// Importez vos images avec le bon chemin relatif
import Demenagement from "../../assets/scrole/menagement.jpg";
import climatiseur from "../../assets/scrole/climatiseur.jpg";
import picine from "../../assets/scrole/picine.jpg";
import platre from "../../assets/scrole/platre.jpg";
import port from "../../assets/scrole/port.webp";

const Carosel = () => {
  const caroselInfo = [
    {
      img: Demenagement,
      titreImg: "Demenagement",
      textImg: "faire le demenagement .",
    },
    {
      img: climatiseur,
      titreImg: "Climatisation",
      textImg: "faire installer la climatisation .",
    },
    {
      img: picine,
      titreImg: "Netoyage des picines",
      textImg: "faire le netoyer des picines .",
    },
    {
      img: platre,
      titreImg: "Platre",
      textImg: "faire des disagnes interieur trés moderne avec platre .",
    },
    {
      img: port,
      titreImg: "Minuiserie",
      textImg: "faire installer les porte et les fenetres .",
    },
  ];

  return (
    <div className="caroselDiv">
      <Carousel data-bs-theme="dark">
        {caroselInfo.map((item, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={item.img} alt={item.titreImg} />
            <Carousel.Caption className="caroselInfos">
              <h5>{item.titreImg}</h5>
              <p>{item.textImg}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Carosel;
