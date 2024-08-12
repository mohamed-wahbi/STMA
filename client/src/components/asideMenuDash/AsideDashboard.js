import React, { useState } from "react";
import "./asideDashboard.css";

import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const AsideDashboard = ({ setComponentDash }) => {
  const [toggle, setToggle] = useState(false);
  const [activeComponent, setActiveComponent] = useState('');

  const handleComponentClick = (component) => {
    setComponentDash(component);
    setActiveComponent(component);
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip">
      {props}
    </Tooltip>
  );

  return (
    <>
      <div className={toggle ? "smallAsideDash open" : "smallAsideDash"}>
        <b onClick={() => setToggle((prev) => !prev)}>
          <i className="bi bi-gear-fill"></i>
        </b>

        <div className="dashSmallComponent">
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Dashboard-Admin")}
          >
            <Button variant="success" className="btnDashSmall">
              <i className="bi bi-ui-radios-grid"></i>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Questions-Utilisateurs")}
          >
            <Button
              variant="success"
              onClick={() => handleComponentClick("userQestion")}
            >
              <i className="bi bi-patch-question"></i>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Entreprise")}
          >
            <Button
              variant="success"
              onClick={() => handleComponentClick("entreprise")}
            >
              <i className="bi bi-building"></i>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Avis-Utilisateurs")}
          >
            <Button
              variant="success"
              onClick={() => handleComponentClick("userAvies")}
            >
              <i className="bi bi-journal-plus"></i>
            </Button>
          </OverlayTrigger>

          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip("Page-Services")}
          >
            <Button
              variant="success"
              onClick={() => handleComponentClick("services")}
            >
              <i className="bi bi-person-workspace"></i>
            </Button>
          </OverlayTrigger>
        </div>
      </div>

      <div className="asideDash">
        <h4>
          <span>
            <i className="bi bi-ui-radios-grid"></i>
          </span>{" "}
          Admin-Dashboard
        </h4>
        <div className="dashboardContent">
          <div className="inputSearch">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search..." />
          </div>

          <div
            className={activeComponent === "userQestion" ? "inputSearch clicked" : "inputSearch"}
            onClick={() => handleComponentClick("userQestion")}
          >
            <i className="bi bi-patch-question"></i>
            <p>User_Qestion</p>
          </div>

          <div
            className={activeComponent === "entreprise" ? "inputSearch clicked" : "inputSearch"}
            onClick={() => handleComponentClick("entreprise")}
          >
            <i className="bi bi-building"></i>
            <p>Entreprise</p>
          </div>

          <div
            className={activeComponent === "userAvies" ? "inputSearch clicked" : "inputSearch"}
            onClick={() => handleComponentClick("userAvies")}
          >
            <i className="bi bi-journal-plus"></i>
            <p>User_Avies</p>
          </div>

          <div
            className={activeComponent === "services" ? "inputSearch clicked" : "inputSearch"}
            onClick={() => handleComponentClick("services")}
          >
            <i className="bi bi-person-workspace"></i>
            <p>Services</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AsideDashboard;
