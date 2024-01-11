import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

const { state , dispatch} = useContext(UserContext);

const RenderMenu = () => {
if(state) {
  return (
    <>
    <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
 <li className="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/logout">Logout</NavLink>
      </li>
      
     
    </>
  )
} else{
  return(
    <>
    <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
 <li className="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signup">Register</NavLink>
      </li>
     
      
    </>
  )
}
}

  return (
    <>
      
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <NavLink class="navbar-brand" to="#">Navbar</NavLink>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      
     
      
     
    </ul>
   
  </div>
</nav>
      
    </>
  )
}

export default Navbar
