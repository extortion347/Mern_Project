import React, { useState, useHistory, useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { UserContext } from '../App';


const Login = () => {

const {state, dispatch} = useContext(UserContext);

const history = useHistory();

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

const loginUser = async(e) => {

e.preventDefault();

const res = await fetch('/signin', {
  method:"POST",
  headers:{
  "Content-Type" : "application/json"
  },
  body: JSON.stringify({
    email,password
  })
})

const data = res.json();

if(data.status === 400 || !data){
  window.alert('Invalid Credentials');
  console.log('Invalid Credentials');
}else{
  dispatch({type:"USER",payload:true})
  window.alert('Login Successful');
  console.log('Login Successful');
//after success it would go back to the login page
  history.pushState("/");
}

}

  return (
    <>
     
     <section className='sign-in'>
        <div className='container mt-5'>

          <div className='signin-content'>
          <div className='signin-image'>
  <figure>
    <img src="" alt="registration pic" />
  </figure>
  <NavLink to='/signup' className="signup-image-link">Create an account</NavLink>
</div>
         
          <div className='signin-form'>
            <h2 className='form-title'>Sign Up</h2>
            <form method='POST' className='register-form' id='register-form'>
              
              <div className='form-group'>
                <label htmlFor="email">
                <i class="zmdi zmdi-account material-icons-email"></i>
                </label>
                <input type="text" name='email' id='email' autoComplete='off' value={email}
                onChange={(e)=> setEmail(e.target.value)} placeholder='Your Email' />
                
              </div>
              
              <div className='form-group'>
                <label htmlFor="password">
                <i class="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input type="password" name='password' id='password' autoComplete='off' value={password}
                 onChange={(e)=> setPassword(e.target.value)} placeholder='Your Password' />
                
              </div>

              

              <div className='form-group form-button'>
                <input type="submit" name='signin' id='signin' className='form-submit' value='Log In'
                onClick={loginUser}/>

              </div>
            </form>


            </div>
          </div>

        </div>
    </section>
      
    </>
  )
}

export default Login
