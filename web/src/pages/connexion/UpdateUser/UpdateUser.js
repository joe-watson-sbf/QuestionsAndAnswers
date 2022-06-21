import React, {useState} from 'react'
import Auth from '../Auth';
import { update_profile } from '../../../actions/authActions';
import { updateProfile } from "firebase/auth";

const UpdateUser = ({ dispatch }) => {



    const [name, setNombre] = useState(Auth.currentUser.displayName);
    const [email, setEmail] = useState(Auth.currentUser.email);
    const [message, setMessage] = useState(null);



    const handleUpdateDataListener = () =>{
        setMessage(null)
        if(name && name!==Auth.currentUser.displayName){
            updateProfile(Auth.currentUser, {
                displayName: name
              }).then(() => {
                dispatch(update_profile(Auth.currentUser.displayName, Auth.currentUser.email))
                setMessage("Profile updated!")
              }).catch((error) => {
                setMessage(error.message)
              });
        }else{
            setMessage("Error, try again!")
        }
    }

    

    return (
        <section className="update-form content" >

        
            <div>
                <h1>Update Your Profil</h1>
                <p>
                    Username
                    <input 
                        type={"text"}
                        placeholder={"Full name"}
                        value={name ? name : ""}
                        onChange = {(event)=> setNombre(event.target.value)}
                     />
                </p>
                <p>
                    Email
                    <input 
                        type="email"
                        value={email ? email:" " }
                        disabled='on'
                        onChange = {(event)=> setEmail(event.target.value)}
                     />
                </p>
            </div>
            <div className="main-alert" style={{margin:'1em'}}>
                {message && 
                    <span className="message-alert" > 
                    {message} </span>}
            </div>
            <button onClick={handleUpdateDataListener} className="button"> Submit Change </button>
        </section>
    )
}




export default UpdateUser