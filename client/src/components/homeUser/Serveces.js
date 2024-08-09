import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import img1 from "../../assets/materiel/1.png";
import img2 from "../../assets/materiel/2.png";
import img3 from "../../assets/materiel/3.png";
import img4 from "../../assets/materiel/4.png";

const Serveces = () => {
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const servicesData = await axios.get(
        "http://127.0.0.1:5050/api/service/getAll"
      );
      setAllServices(servicesData.data.services);
    } catch (error) {
      console.log("error lors de la fetching des services !", error);
    }
  };

  return (
    <>
      <div className="titreServices">
        <h1>Services :</h1>
      </div>
      <div className="services">
        <img src={img1} alt="imgMateriel" width={250} className="img1" />
        <img src={img3} alt="imgMateriel" width={250} className="img3" />
        <img src={img4} alt="imgMateriel" width={450} className="img4" />
        {allServices.map((item, index) => {
          return (
            <>
              <div className="ServecesPc" >
                <Card border="danger" style={{ width: "18rem" }} key={index} data-aos="zoom-in">
                  <Card.Header>
                    {" "}
                    <i className={item.icon}></i> {item.titreService}{" "}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{item.descriptionService}</Card.Text>
                  </Card.Body>
                </Card>
                <br />
              </div>

              <div className="showServices">
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <i className={item.icon}> </i> {item.titreService}{" "}
                    </Accordion.Header>
                    <Accordion.Body>{item.descriptionService}</Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Serveces;
