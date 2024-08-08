import React, { useState, useEffect } from 'react';
import './alarme.css';
import axios from 'axios';

const CurrentDateTime = ({idCl}) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [alarmDesc, setAlarmDesc] = useState('');
  const [DATE, setDATE] = useState('');
  const [TIME, setTIME] = useState('');
  const [alarms, setAlarms] = useState([]);


  // Function to update current date and time
  const updateDateTime = () => {
    setCurrentDateTime(new Date());
  };

  // Effect to update time every second
  useEffect(() => {
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Effect to activate alarms
  useEffect(() => {
    const updatedAlarms = alarms.map((alarm) => {
      if (currentDateTime >= alarm.dateTime && !alarm.activated) {
        return { ...alarm, activated: true };
      }
      return alarm;
    });
    setAlarms(updatedAlarms);
  }, [currentDateTime, alarms]);

  // Format date and time
  const formatAlarmDateTime = (date) => {
    if (!date) return '';
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // Add alarm function
  const alarmeConfig = (e) => {
    e.preventDefault();
    const combinedDateTime = new Date(`${DATE}T${TIME}`);
    setAlarms([...alarms, { id: Date.now(), alarmDesc: alarmDesc, dateTime: combinedDateTime, activated: false }]);
    setTIME('');
    setDATE('');
    setAlarmDesc('');
  };

  // Delete alarm function
  const deleteAlarm = (id) => {
    const updatedAlarms = alarms.filter((alarm) => alarm.id !== id);
    setAlarms(updatedAlarms);
  };

  // Confirm Alarm
  const ConfirmerAlarm = async (id) => {
    const alarmToConfirm = alarms.find((alarm) => alarm.id === id);
    if (!alarmToConfirm) {
      console.error('Alarme non trouvée');
      return;
    }

    try {
      // Convertir la date en UTC avec toISOString()
      const dateTimeUTC = new Date(alarmToConfirm.dateTime).toISOString();

      await axios.post('http://127.0.0.1:5050/api/alarm/create', {
        alarmDesc: alarmToConfirm.alarmDesc,
        dateTime: dateTimeUTC, // Envoyer la date convertie en UTC
        
        client: idCl // Remplacez par l'ID du client approprié
      });

      // Mettre à jour l'état des alarmes après création
      const updatedAlarms = alarms.map((alarm) =>
        alarm.id === id ? { ...alarm, activated: true } : alarm
      );
      setAlarms(updatedAlarms);
      alert('Alarme bien enregistrée.');
    } catch (error) {
      console.error("Erreur lors de la création de l'alarme", error);
    }
  };

  return (
    <div className='alarmeComponent'>
      <div className='dateHeurActuel'>
        <h1 className='titreAlarm'>Date et Heure Actuelles</h1>
        <p>Date: {currentDateTime.toLocaleDateString()}</p>
        <p>Heure: {currentDateTime.toLocaleTimeString()}</p>
      </div>

      <hr />

      <form onSubmit={alarmeConfig}>
        <div className='dateForm'>
          <label className='titreAlarm'>Description de l'alarme</label>
          <input
            type='text'
            placeholder='pour me rappeler à notre rendez-vous de ...'
            value={alarmDesc}
            onChange={(e) => setAlarmDesc(e.target.value)}
            required
          />
        </div>
        <div className='dateForm'>
          <label className='titreAlarm'>Heure</label>
          <input
            type='time'
            value={TIME}
            onChange={(e) => setTIME(e.target.value)}
            required
          />
        </div>
        <div className='dateForm'>
          <label className='titreAlarm'>Date</label>
          <input
            type='date'
            value={DATE}
            onChange={(e) => setDATE(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='enregistreDateBtn'>
          Enregistrer
        </button>
      </form>

      <hr />
      <div className='alarmeProgramer'>
        {alarms.map((alarm) => (
          <div key={alarm.id}>
            <h4>{alarm.alarmDesc}</h4>
            <p>Alarme programmée le : {formatAlarmDateTime(alarm.dateTime)}</p>
            <p>Status: {alarm.activated ? 'Activée' : 'Non activée'}</p>
            <button onClick={() => ConfirmerAlarm(alarm.id)} className='btnAlarm'>
              Confirmer
            </button>
            <button onClick={() => deleteAlarm(alarm.id)} className='btnAlarm'>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentDateTime;
