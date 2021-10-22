import React, {useState, useEffect} from 'react'
import firebase from "firebase/app";
import Auth from '../Auth';
import GoogleButton from 'react-google-button';

const SignIn = () => {

    const [signUp, setSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");


    const clearInputs = ()=>{
        setEmail('');
        setPassword('');
    }

    const clearMessage = ()=>{
        setMessage('');
    }

    const handleOption = ()=>{
        if(signUp){
            handleCreateAccount();
        }else{
            handleLogin();
        }
    }

    const handleLogin = ()=>{
        clearMessage();
        Auth.signInWithEmailAndPassword(email, password)
        .catch((error) => {
            setMessage(error.message)
        })
    }

    const handleCreateAccount=()=>{
        clearMessage();
        Auth.createUserWithEmailAndPassword(email, password)
            .catch((error) => {
                setMessage(error.message)
            })
    }

    const handleSignUp=()=>{
        clearMessage();
        setSignUp(signUp => !signUp);
    }

    const authListener = () => {
        Auth.onAuthStateChanged((user)=>{
            if(user){
                clearInputs();
            }
        })
    }

    useEffect(()=>{
        authListener();
    })

    const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		Auth.signInWithPopup(provider);
	};

    return (
        <div className="main">
            <div className="loginContainer" >
                <div >
                    <h2> {signUp ? "Sign Up" : "Sign In"} </h2>

                    <div>
                        <div className="row">
                            <input 
                                type="email" 
                                name="Username" 
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(event)=> setEmail(event.target.value)}
                            />

                        </div>
                        <div className="row">
                            <input 
                                type="password" 
                                name="Password" 
                                placeholder="Enter your password"
                                required
                                value={password}
                                onChange={(event)=> setPassword(event.target.value)}
                            />
                        </div>
                    </div>
                    <div className="main-alert">
                        { message && <span className="alert"> {message} </span>}
                        
                    </div>
                    <div className="row login">
                        <button 
                            onClick= {handleOption}
                         className="loginBtn btn"> {signUp ? "Sign Up" : "Sign In"} </button>
                        
                        
                        <p onClick= {handleSignUp}>
                            {signUp ? "Have an account? " : "You haven't an account?"}
                            <span>
                                {signUp ? "Sign In" : "Sign Up"}
                            </span>
                        </p>
                        
                    </div>
                </div>
            </div>


            <GoogleButton 
                type="dark" 
                className="btn-google" 
                onClick={signInWithGoogle} />

        </div>
    )
}

export default SignIn