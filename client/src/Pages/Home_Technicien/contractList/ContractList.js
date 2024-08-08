import React from 'react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import './contratList.css';

const ContractList = ({ contracts, deleteContract }) => {

  const generatePDF = (contract) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(40);

    // Titre centré avec modification de la police
    const title = "Contrat de Service";
    const titleWidth = doc.getStringUnitWidth(title) * doc.internal.getFontSize() / doc.internal.scaleFactor;
    const startX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(title, startX, 22);

    // Ajout d'une ligne en dessous du titre
    doc.line(startX, 25, startX + titleWidth, 25);

    doc.setFontSize(12);
    doc.setTextColor(0);

    const columns = ["Détails", "Valeur"];
    let rows = [
      // Utilisation correcte des tableaux pour définir chaque ligne avec les bonnes propriétés
      [{ content: "Informations Client", colSpan: 2, styles: { fontStyle: 'bold', halign: 'center', fillColor: [100, 149, 237], textColor: [255, 255, 255] } }],
      ["Nom et Prénom", contract.clientName],
      ["Adresse", contract.clientAddress],
      ["Numéro de Téléphone", contract.phoneNumber],
      ["Email", contract.email],
      [{ content: "Informations Projet", colSpan: 2, styles: { fontStyle: 'bold', halign: 'center', fillColor: [100, 149, 237], textColor: [255, 255, 255] } }],
      ["Secteur du Projet", contract.projectSector],
      ["Titre du Projet", contract.projectTitle],
      ["Description du Projet", contract.projectDescription],
    ];

    // Ajout des besoins fonctionnels avec titre centré
    rows.push([
      { content: "Besoins Fonctionnels", colSpan: 2, styles: { fontStyle: 'bold', halign: 'center' } }
    ]);
    contract.functionalRequirements.forEach((req) => {
      rows.push([req.title, req.description]); // Titre centré dans la cellule
    });

    // Ajout des besoins non fonctionnels avec titre centré
    rows.push([
      { content: "Besoins Non Fonctionnels", colSpan: 2, styles: { fontStyle: 'bold', halign: 'center' } }
    ]);
    contract.nonFunctionalRequirements.forEach((req) => {
      rows.push([req.title, req.description]); // Titre centré dans la cellule
    });

    // Ajout des autres détails
    rows.push(
      ["Délais", contract.deadlines],
      ["Prix", contract.price],
      ["Nom de l'Entreprise", contract.companyName],
      ["Nom du Technicien", contract.technicianName],
      ["Date", contract.date ? contract.date.toLocaleString() : ''],
    );

    // Ajout de la section des signatures dans un tableau avec un style unique
    rows.push([
      { content: "Signatures", colSpan: 2, styles: { fontStyle: 'bold', halign: 'center', fillColor: [100, 149, 237], textColor: [255, 255, 255] } },
      ''
    ]);
    rows.push(["Signature Client : ", ""]);
    rows.push(["Signature Technicien : ", ""]);
    rows.push(["Signature Responsable Agence : ", ""]);

    doc.autoTable(columns, rows, { startY: 30, columnStyles: { 0: { cellWidth: 'wrap' } } });

    doc.save(`${contract.clientName}_contract.pdf`);
  };

  return (
    <div className="contract-list">
      <h2>Liste des Contrats</h2>
      <ul>
        {contracts.slice().reverse().map((contract, index) => (
          <li key={index} className="contract-item">
            <p>Client: {contract.clientName}</p>
            <p>Date: {contract.date ? contract.date.toLocaleString() : ''}</p>
            <button onClick={() => generatePDF(contract)}>Générer PDF</button>
            <button onClick={() => deleteContract(index)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContractList;
