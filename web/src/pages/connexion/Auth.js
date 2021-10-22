import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

firebase.initializeApp({
	apiKey: "AIzaSyAwFtH59Kw0GV2t9vUUeXp5kYYIla_DJxU",
	authDomain: "sofkau-questionsanswers.firebaseapp.com",
	projectId: "sofkau-questionsanswers",
	storageBucket: "sofkau-questionsanswers.appspot.com",
	messagingSenderId: "340833965617",
	appId: "1:340833965617:web:70c5530515309d12fc2710",
	measurementId: "G-QQZFWPXZ0F"
});

const Auth = firebase.auth();



export default Auth;
