import React, {useState} from 'react'
import Auth from '../Auth';
import { update_profile } from '../../../actions/authActions';

const UpdateUser = ({ dispatch }) => {



    const [name, setNombre] = useState(Auth.currentUser.displayName);
    const [email, setEmail] = useState(Auth.currentUser.email);
    const [message, setMessage] = useState(null);


    if(Auth.currentUser){
        dispatch(update_profile(Auth.currentUser.displayName, Auth.currentUser.email))
    }

    const handleUpdateDataListener = () =>{
        setMessage(null)
        if(name && name!==Auth.currentUser.displayName){
            Auth.currentUser.updateProfile({displayName: name})
            setMessage("Name updated!!!")
        }

        if(email && email!==Auth.currentUser.email){
            Auth.currentUser.verifyBeforeUpdateEmail(email)
            .catch((e) => setMessage("Invalid email!"))

            Auth.currentUser.updateEmail(email)
            .then((e) => setMessage("Email updated!"))
            .catch((e) => setMessage(e.message))
        }
        

    }

    

    return (
        <section className="update-form content" >

        
            <div>
                <h2>Update Your Profil</h2>
                <p>
                    <input 
                        type={"text"}
                        placeholder={"Full name"}
                        value={name ? name : ""}
                        onChange = {(event)=> setNombre(event.target.value)}
                     />
                </p>
                <p>
                    <input 
                        type={"email"}
                        value={email ? email:" " }
                        onChange = {(event)=> setEmail(event.target.value)}
                     />
                </p>
            </div>
            <div className="main-alert">
                {message && 
                    <span className="message-alert" > 
                    {message} </span>}
            </div>
            <button onClick={handleUpdateDataListener} className="button"> Submit Change </button>
        </section>
    )
}




export default UpdateUser