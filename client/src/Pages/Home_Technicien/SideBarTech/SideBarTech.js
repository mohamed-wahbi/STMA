import React from 'react';
import './sideBarTech.css'

const SideBarTech = ({setPageTech}) => {
  return (
    <div className='asideTechnicien'>
        <div className='titleTech'>STMA</div>
        <div className='technicienLink'>
          <div className='techLink' onClick={()=>setPageTech('dashboard')}><i class="bi bi-person"></i> Dachboard</div>
          <div className='techLink' onClick={()=>setPageTech('client')}> <i class="bi bi-person-vcard"></i> client</div>
          <div className='techLink' onClick={()=>setPageTech('alarm-table')}><i class="bi bi-alarm"></i> alarms </div>
          <div className='techLink' onClick={()=>setPageTech('cahier-des-charge')}><i class="bi bi-person-vcard"></i> contrat</div>
        </div>
        <div className='technicienOption'>
        <i class="bi bi-trophy"></i> {" "} <p> Prims</p>
        </div>
      </div>
  )
}

export default SideBarTech
