
import React from 'react'
import { NavLink } from 'react-router-dom'
import './header.css'

export const Header = () => {

  return (
    <div className='headerWarp'>  
      <div className='headerContainer'>
        <nav className='navBar bg-dark border-bottom border-secondary-subtle border-opacity-25'>
            <NavLink to='/'><h4 className='itemOne'><i className="bi bi-house-door-fill"></i></h4></NavLink>
        </nav>
      </div>
    </div>
  )
}
