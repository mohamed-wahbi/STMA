import React from 'react'
import './besoinConfTable.css'
import { Link } from 'react-router-dom'

const BesoinConfTable = ({serviceConfirmer}) => {
  return (
       <div className='tableServiceConfirmer'>
        <h3>Besoins table </h3>
        <table >

          <tr>
            <th>numero</th>
            <th>nom client</th>
            <th>email </th>
            <th>numero tel</th>
            <th>Rendez-vous</th>
            <th>Besoins ou cahier des charges </th>
          </tr>
          {serviceConfirmer.map((user,index)=>{
          return(
            <tr>
              <td> {index} </td>
              <td> {user.username} </td>
              <td> {user.email} </td>
              <td> {user.numTel} </td>
              <td className='btnContact'>
                <Link to={`/contacterClient/${user._id}`} >Contacter</Link>
              </td>
              <td  className='btnVoir'>
                <Link>Voir +</Link>
              </td>
            </tr>
          )
        })}
          

        </table>
      </div>
    
  )
}

export default BesoinConfTable
