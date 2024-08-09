import React from 'react';
import  './felicitation.css'
import { Link } from 'react-router-dom';

const Felicitation = () => {
  return (
    <div className="felicitation-container">
      <h2>Félicitations !</h2>
      <p>Votre entreprise a été enregistrée avec succès.</p>
      <p>Merci pour votre inscription.</p>

      <Link  to="/home">
        <button>Home Page</button>
      </Link>
    </div>
  );
};

export default Felicitation;
