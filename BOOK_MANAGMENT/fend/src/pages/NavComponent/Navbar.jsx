import React from 'react'
import { Link } from 'react-router-dom'
import '../style.css';
const Navbar = () => {
  return (
    <header>
        <div className='logo'>
            PustKam
        </div>
        <div className="display-menu">
            <Link className='menu' to={"/"}>LogOut</Link>
            <Link className='menu' to={"/booklist"}>BookList</Link>
            <Link className='menu' to={"/home"}>Home</Link>
        </div>
    </header>
  )
}

export default Navbar