import React , {useState, useHistory} from 'react'
import { NavLink } from 'react-router-dom'

const Signup = () => {

const history = useHistory();

  //getting the value
  const [user, setUser] =  useState ({
    name:"",email:"",phone:"",work:"",password:"",cpassword:""
        });

//storing the values whatever is being written        
        let name,value;
        const handleInputs = (e) => {
          console.log(e);
          name = e.target.name;
          value = e.target.value;

          setUser({...user,[name]:value});
        }


const PostData = async (e) => {
e.preventDefault();
const {name,email,phone,work,password,cpassword} = user;

const res = await fetch("/register",
{method: "POST",
headers: {
  "Content-Type" : "application/json"

},
body: JSON.stringify({
  name,email,phone,work,password,cpassword
})

});

const data = await res.json();

if(data.status === 422 || !data){
  window.alert('Invalid registration');
  console.log('Invalid registration');
}else{
  window.alert('Invalid registration');
  console.log('Invalid registration');
//after success it would go back to the login page
  history.pushState("/login");
}


}


  return (
    <>


    <section className='signup'>
        <div className='container mt-5'>

          <div className='signup-content'>
          <div className='signup-form'>
            <h2 className='form-title'>Sign Up</h2>
            <form method='POST' className='register-form' id='register-form'>
              <div className='form-group'>
                <label htmlFor="name">
                <i class="zmdi zmdi-account material-icons-name"></i>
                </label>
                <input type="text" name='name' id='name' autoComplete='off' placeholder='Your Name' 
                value={user.name} onChange={handleInputs}/>
                
              </div>
              <div className='form-group'>
                <label htmlFor="email">
                <i class="zmdi zmdi-account material-icons-email"></i>
                </label>
                <input type="text" name='email' id='email' autoComplete='off' placeholder='Your Email' 
                value={user.email} onChange={handleInputs}/>
                
              </div>
              <div className='form-group'>
                <label htmlFor="phone">
                <i class="zmdi zmdi-account material-icons-phone"></i>
                </label>
                <input type="number" name='phone' id='phone' autoComplete='off' placeholder='Your Phone'
                value={user.phone} onChange={handleInputs} />
                
              </div>
              <div className='form-group'>
                <label htmlFor="work">
                <i class="zmdi zmdi-account material-icons-work"></i>
                </label>
                <input type="text" name='work' id='work' autoComplete='off' placeholder='Your Profession' 
                value={user.work} onChange={handleInputs}/>
                
              </div>
              <div className='form-group'>
                <label htmlFor="password">
                <i class="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input type="password" name='password' id='password' autoComplete='off' placeholder='Your Password' 
                value={user.password} onChange={handleInputs}/>
                
              </div>

              <div className='form-group'>
                <label htmlFor="cpassword">
                <i class="zmdi zmdi-lock material-icons-name"></i>
                </label>
                <input type="password" name='cpassword' id='cpassword' autoComplete='off' placeholder='Confirm Your Password' value={user.cpassword} onChange={handleInputs} />
                
              </div>

              <div className='form-group form-button'>
                <input type="submit" name='signup' id='signup' className='form-submit' value='register'/>

              </div>
            </form>

<div className='signup-image'>
  <figure>
    <img src="" alt="registration pic" />
  </figure>
  <NavLink to='/login' className="signup-image-link">I am already registered</NavLink>
</div>

          </div>
          </div>
        </div>
    </section>
      
    </>
  )
}

export default Signup
