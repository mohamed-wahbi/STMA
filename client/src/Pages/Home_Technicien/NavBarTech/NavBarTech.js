import React from 'react'
import './navBarTech.css'
import STMA from '../../../assets/logoClear.png'
import person from '../../../assets/persone3d.webp'
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

const NavBarTech = () => {
  const navigate = useNavigate()


  const logout = ()=>{
    localStorage.removeItem("token");
    navigate("/");
    }
  return (
    <div className='navBarTech'>
      <div className='nvbr1'>
        <div className='nvbr1Img'>
          <img src={STMA} alt='logo stma' />
        </div>
        
      </div>

      <div className='nvbr2'>

     


        <div>
          <Dropdown>
          <Dropdown.Toggle  id="dropdown-basic" className='custom-toggle'  >
          <div className='notification'>
            <i class="bi bi-bell" width={25} height={23} ></i><span>1</span>
          </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">News 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">News 2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">News 3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </div>
   
        <div>
          <Dropdown>
            <Dropdown.Toggle  className='custom-toggle' >
              <img src={person} alt='icon' width={45} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Parametre</Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>



      </div>
    </div>
  )
}

export default NavBarTech
