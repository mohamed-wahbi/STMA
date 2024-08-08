import React from 'react'
import './dashboard.css'
import BesoinConfTable from '../besoinConfTable/BesoinConfTable.js'


const Dashboard = ( {serviceConfirmer} ) => {
  return (
    <div className='dashboard'>
        <BesoinConfTable serviceConfirmer={serviceConfirmer} />
    </div>
  )
}

export default Dashboard
