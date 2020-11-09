import React from 'react'
import {Link} from 'react-router-dom';

// const Article = () => { // becomes:
const Navbar = () => {

  return (
    <div>
      <ul className='navbar-container'>
        <Link to='/articles'><li>Home</li></Link>
        <Link to='/articles/new'><li>Add</li></Link>
      </ul>
    </div>
  )
}

export default Navbar;
