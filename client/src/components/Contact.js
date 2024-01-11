import React, {useEffect,useState} from 'react'

const Contact = () => {


  const [userData, setUserData] = useState({name:"",email:"",phone:"",message=""});
  
  
  const userContact = async () => {
    try{
      const res = await fetch('/getdata', {
        method: "GET",
        headers: {
          
          "Content-Type": "application/json"
        },
               });
      const data = await res.json();
      console.log(data);
      setUserData({...userData, name:userData.name,email:userData.email,phone:userData.phone});
  
  if(!res.status === 200){
    const error = new Error(res.error);
    throw error;
  }
  
    } catch(err) {
      console.log(err);
      
    }
  }
  
   useEffect(() => {
  userContact();
   }, []);

  //  we are storing data in states

const handleInputs = (e) => {
  const name = e.target.name;
  const value = e.target.value;

  setUserData({...userData, [name]:value});
}

// send the data to backend
const contactForm = async (e) => {
  e.preventDefault();

const {name, email, phone, message} = userData;

const res = await fetch('/contact', {
  method: "POST",
  headers: {
    "Contact-Type": "application/json"
  },
  body: JSON.stringify({
    name,email,phone,message
  })
});

const data = await res.json(); 

if(!data) {
  console.log("message not send");
}else{
  alert("Message Send");
  setUserData({...userData,message: ""})
}

}

  return (
    <>
      
    <div className='contact_info'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-10 offset-lg-1 d-flex justify-content-between' >

            <div className='contact_info_item d-flex justify-content-start align-items-center'>
              <img src="" alt="phone" />
              <div className='contact_info_content'>
                <div className='contact_info_title'>
                  Phone
                </div>
                <div className='contact_info_text'>
                 +91 111 543 2198
                </div>
              </div>
            </div>

            <div className='contact_info_item d-flex justify-content-start align-items-center'>
              <img src="" alt="phone" />
              <div className='contact_info_content'>
                <div className='contact_info_title'>
                  Email
                </div>
                <div className='contact_info_text'>
                 hamza@gmail.com
                </div>
              </div>
            </div>

            <div className='contact_info_item d-flex justify-content-start align-items-center'>
              <img src="" alt="phone" />
              <div className='contact_info_content'>
                <div className='contact_info_title'>
                 Address
                </div>
                <div className='contact_info_text'>
                 Karachi, Pakistan
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

{/* contact us form */}

<div className='contact_form'>
<div className='container'> 
<div className='row'>
<div className='col-lg-10 offset-lg-1'>
  <div className='contact_form_container py-5'>
    <div className='contact_form_title'>
      Get in Touch
    </div>
    <form method='POST' id='contact_form'>
      <div className='contact_form_name d-flex justify-content-between align-item'>
        <input type="text" id='contact_form_name' className='contact_form_name input_field' name="name" onChange={handleInputs()} value={userData.name} 
        placeholder='Your Name' requiredtrue/>

        <input type="email" id='contact_form_email' className='contact_form_email input_field' name="email" onChange={handleInputs()} value={userData.email} placeholder='Your Email' requiredtrue/>

        <input type="number" id='contact_form_number' className='contact_form_number input_field' name="phone" onChange={handleInputs()} value={userData.phone} placeholder='Your Phone Number' requiredtrue/>

      </div>

      <div className='contact_form_text'>

<textarea className='text_field contact_form_message' name="message" onChange={handleInputs()} value={userData.message} 
placeholder='Message' id="" cols="30" rows="10"></textarea>

      </div>
      <div className='contact_form_button'>
        <button type='submit' className='button contact_submit_button' onClick={contactForm()} >Send Message</button>
      </div>
    </form>
  </div>

</div>
</div>
</div>
</div>

    </>
  )
}

export default Contact
