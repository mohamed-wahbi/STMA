import React, { useEffect, useState } from "react";
import "./services.css";
import axios from "axios";

const Services = () => {
  
  const [allServices, setAllServices] = useState([]);


  const [idSelected, setIdSelected] = useState(null);

  const [dataForm, setDataForm] = useState({
    icon: "",
    titreService: "",
    descriptionService: "",
  });
  const handleInputChange = (e) => {
    setDataForm({ ...dataForm, [e.target.name]: e.target.value });
  };

  const [createUpdateBtn, setCreateUpdateBtn] = useState("Create-Service");
  const fetchServices = async () => {
    try {
      const servicesData = await axios.get(
        "http://127.0.0.1:5050/api/service/getAll"
      );
      setAllServices(servicesData.data.services);
      console.log(allServices);
    } catch (error) {
      console.log("error lors de la fetching des services !", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const deleteServiceById = async (id) => {
    try {
      const deletedService = await axios.delete(
        `http://127.0.0.1:5050/api/service/delete/${id}`,
        { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
      fetchServices();
      console.log(deleteServiceById);
    } catch (error) {
      console.log("error lors de la supprission d'un service !", error);
    }
  };

  const updateServiceById = async (id) => {
    try {
      const updateService = await axios.put(
        `http://127.0.0.1:5050/api/service/update/${id}`,
        dataForm,
        { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }

      );
      fetchServices();
      setDataForm({
        icon: "",
        titreService: "",
        descriptionService: "",
      });
    } catch (error) {
      console.log("error lors de la modification du service !", error);
    }
  };

  const handleEdit = (id) => {
    const selectServiceToUpdate = allServices.find((item) => item._id === id);
    setDataForm({
      icon: selectServiceToUpdate.icon,
      titreService: selectServiceToUpdate.titreService,
      descriptionService: selectServiceToUpdate.descriptionService,
    });
    setIdSelected(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (idSelected) {
        await updateServiceById(idSelected);
      } else {
        console.log("test1")
        await axios.post(`http://127.0.0.1:5050/api/service/create`,
         dataForm,
         { headers: { authorization: `Bearer ${localStorage.getItem("token")}` } }
         );
         console.log("test2")

      }

      fetchServices();
      setIdSelected(null);
      setDataForm({
        icon: "",
        titreService: "",
        descriptionService: "",
      });
    } catch (error) {
      console.log("Error in adding or updating service !", error);
    }
  };

  return (
    <div className="serviceComponent">
      <h3>Crée des Services :</h3>
      <div className="createServices">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Titre service :</label>
            <input
              name="titreService"
              type="text"
              value={dataForm.titreService}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Description service :</label>
            <input
              name="descriptionService"
              type="text"
              value={dataForm.descriptionService}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label>Icone service :</label>
            <input
              name="icon"
              type="text"
              value={dataForm.icon}
              onChange={handleInputChange}
            />
          </div>

          <div className="createUpdateServiceBtn">
            <button>{idSelected ? "Update-Service" : "Create-Service"} </button>
          </div>
        </form>
      </div>

      <h3>Tableau des Services :</h3>
      <table className="sarvicesTab">
        <tr className="headerTab">
          <td>Icones_Service</td>
          <td>Titre_Service</td>
          <td>Description_Service</td>
          <td>Controler</td>
        </tr>
        {allServices.map((item) => {
          return (
            <tr>
              <td> {item.icon} </td>
              <td> {item.titreService} </td>
              <td> {item.descriptionService} </td>
              <td className="btnControler">
                <button
                  className="updateService"
                  onClick={() => handleEdit(item._id)}
                >
                  update
                </button>
                <button 
                
                  className="deleteService"
                  onClick={() =>{ 
                    deleteServiceById(item._id);

                  
                  }}
                >
                  delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Services;
