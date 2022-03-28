import React from 'react'
import {Link} from 'react-router-dom'

//styles
import './Navbar.css'

export default function Navbar() {
  return (
      <div className='navbar'>
          <nav>
              <Link to="/" className="brand">
                <h1>Cooking Book</h1>
              </Link>

              <Link to="/create">
                Create A Recipe
              </Link>
          </nav>
    </div>
  )
}
