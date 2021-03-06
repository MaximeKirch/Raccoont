import React from 'react'
import { NavLink } from 'react-router-dom'

export default function LeftNav() {
  return (
    <div className="left-nav-container">
        <div className="icons">
            <div className="icons-bis">
                <NavLink to="/" className={(navData) => (navData.isActive ? "active-left-nav" :  "none")}>
                    <img src="./img/icons/home.svg" alt="home"/>
                </NavLink>
                <br />
                <NavLink to="/trending" className={(navData) => (navData.isActive ? "active-left-nav" :  "none") }>
                    <img src="./img/icons/rocket.svg" alt="rocket"/>
                </NavLink>
                <br />
                <NavLink to="/profile" className={(navData) => (navData.isActive ? "active-left-nav" :  "none" )}>
                    <img src="./img/icons/user.svg" alt="user"/>
                </NavLink>
            </div>
        </div>
    </div>
  )
}
