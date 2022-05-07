import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { UidContext } from './AppContext'
import Logout from './Log/Logout'
import { useSelector } from 'react-redux'

export default function Navbar() {
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.user)

    
  return (
  <nav>
      <div className="nav-container">
          <NavLink to="/">
          <div className="logo">
              <img src="./img/icon.png" alt="racoont"/>
              <h3>Raccoont</h3>
          </div>
          </NavLink>
      {uid ? (
          <ul>
              <li></li>
              <li className='welcome'>
                  <NavLink to='/profile'>
                      <h5>Bienvenue {userData.pseudo}</h5>
                  </NavLink>
              </li>
              <Logout/>
          </ul>
      )
      :
      ( <ul>
        <li></li>
        <li>
            <NavLink  to="/profile">
                <img src="./img/icons/login.svg" alt='login' />
            </NavLink>
        </li>
    </ul> )
    }
    </div>
  </nav>
  )
}
