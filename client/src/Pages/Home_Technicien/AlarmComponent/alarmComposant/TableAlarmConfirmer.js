import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const TableAlarmConfirmer = ({ alarmTable, setAlarmTable, alarmSelectionne, setAlarmSelectionne, filterValue, filterType }) => {
    const [filteredAlarm, setFilteredAlarm] = useState(alarmTable);

    useEffect(() => {
        const filterAlarmes = () => {
            let results = alarmTable;
            if (filterType && filterValue) {
                const filterLower = filterValue.toLowerCase();

                if (filterType === 'nom') {
                    results = alarmTable.filter(alarm =>
                        alarm.client.username.toLowerCase().includes(filterLower)
                    );
                } else if (filterType === 'date') {
                    results = alarmTable.filter(alarm =>
                        format(parseISO(alarm.dateTime), 'yyyy-MM-dd').includes(filterValue)
                    );
                } else if (filterType === 'alarm') {
                    results = alarmTable.filter(alarm =>
                        alarm.activated.toString().includes(filterValue)
                    );
                }
            }
            setFilteredAlarm(results);
        };

        filterAlarmes();
    }, [filterValue, filterType, alarmTable]);

    const selectionneAlarm = (id) => {
        setAlarmSelectionne((prevSelectionne) => {
            if (prevSelectionne.includes(id)) {
                return prevSelectionne.filter((alarmId) => alarmId !== id);
            } else {
                return [...prevSelectionne, id];
            }
        });
    };

    const decocheAlarm = () => {
        setAlarmSelectionne([]);
    };

    return (
        <div>
            <div className='deleterAnnulerCtrl'>
                {alarmSelectionne.length > 0 ? (
                    <div className='deleteAlarmBtn'>
                        <p>{alarmSelectionne.length} sélectionné(s)</p>
                        <div>
                            <button className='deleteBtn'>
                                Supprimer <i className='bi bi-trash3'></i>
                            </button>
                            <button className='annuleBtn' onClick={decocheAlarm}>
                                Annuler <i className='bi bi-x-circle'></i>
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>SELECTIONNE</th>
                        <th>Nom</th>
                        <th>Date-Temp</th>
                        <th>Alarme-Activé</th>
                        <th>DETAILS</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAlarm.map((item, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type='checkbox'
                                    value={item._id}
                                    onChange={() => selectionneAlarm(item._id)}
                                    checked={alarmSelectionne.includes(item._id)}
                                />
                            </td>
                            <td>{item.client.username}</td>
                            <td>{format(parseISO(item.dateTime), 'yyyy-MM-dd HH:mm:ss')}</td>
                            <td>{item.activated}</td>
                            <td>
                                <Link to={`/voirAlarmDetails/${item.client._id}`}>Voir</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableAlarmConfirmer;
