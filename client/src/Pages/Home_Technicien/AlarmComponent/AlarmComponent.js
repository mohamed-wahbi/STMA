import React, { useEffect, useState } from 'react';
import './alarmComponent.css';
import axios from 'axios';
import TableAlarmConfirmer from './alarmComposant/TableAlarmConfirmer';
import VocaleFilter from './VocalFilter/VocaleFilter';

const AlarmComponent = () => {

    const [filterType,setFilterType] = useState("");
    const [filterValue,setFilterValue] = useState("");




    const [alarmTable, setAlarmTable] = useState([]);
    const [alarmSelectionne, setAlarmSelectionne] = useState([]);

    useEffect(() => {
        getAllAlarm();
    }, []);

    const getAllAlarm = async () => {
        try {
            const alarms = await axios.get('http://127.0.0.1:5050/api/alarm/getAll');
            console.log(alarms.data.getAlarms);
            setAlarmTable(alarms.data.getAlarms);
        } catch (error) {
            console.log('error lors de la featching alarm from db', error);
        }
    };

    const selectionneAlarm = (id) => {
        setAlarmSelectionne((prevSelectionne) => {
            if (prevSelectionne.includes(id)) {
                return prevSelectionne.filter((alarmId) => alarmId !== id);
            } else {
                return [...prevSelectionne, id];
            }
        });
    };

// ____________________________Filtrage______________________________________
    const handleFilterTypeChange = (event) => {
        const selectedFilterType = event.target.value;
        setFilterType(selectedFilterType);
        setFilterValue(''); // Clear filter value when changing filter type
      };
    
// --------------------------Vovale Filterage------------------------------
const handleVoiceCommand = (command) => {
    command = command.replace(/[^\w\s]|_$/gi, ''); // Removes trailing punctuation or underscore

    if (command.includes('nom')) {
      setFilterType('nom');
      setFilterValue(''); // Clear filter value when changing filter type
    } else if (command.includes('date')) {
      setFilterType('date');
      setFilterValue('');
    } else if (command.includes('alarm')) {
      setFilterType('alarm');
      setFilterValue('');
    } else {
      setFilterValue(command.trim()); // Set filter value after trimming whitespace
    }
  };


    return (
        <div className='alarmComponent'>


            <div className='FILTRAGETAB'>
            <h1>Filtrer les Employeurs par Commande Vocale</h1>

            <VocaleFilter onCommand={handleVoiceCommand}/>

                <div className='filterLabelInput'>
                    <label>Filtrer par : </label>
                    <select value={filterType} onChange={handleFilterTypeChange}>
                        <option value="">Choisir un type...</option>
                        <option value={'nom'}>Nom Client</option>
                        <option value={'date'}>Date</option>
                        <option value={'alarm'}>Alarm Active</option>
                    </select>
                </div>
                
                <div className='filterLabelInput'>
                    <label>Valeur de filtrage :</label>
                    <input type='text' value={filterValue} onChange={(e)=>setFilterValue(e.target.value)} />
                </div>


            </div>
            
            



            

            
            <TableAlarmConfirmer
             alarmTable={alarmTable} 
             setAlarmTable={setAlarmTable} 
             alarmSelectionne={alarmSelectionne} 
             setAlarmSelectionne={setAlarmSelectionne}
             filterType={filterType}
             filterValue={filterValue}

             
             
             />



          
        </div>
    );
};

export default AlarmComponent;
