import React, { useContext, useEffect , useHistory} from 'react'
import { UserContext } from '../App';

const Logout = () => {
 const history = useHistory();
//  promises
const {state,dispatch} = useContext(UserContext);
useEffect(() => {
    fetch('./logout', {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json"
        },
        credentials: "include"
    }).then((res) => {
      dispatch({type:"USER", payload:false})
history.push('./login', {replace: true});
if(res.status != 200){
    const error = new Error(res.error);
    throw error;
  }
    }).catch((err) => {
        console.log(err);
    });
});

    return (
    <>
      <div>
        <h1>Logout page</h1>
      </div>
    </>
  )
}

export default Logout
