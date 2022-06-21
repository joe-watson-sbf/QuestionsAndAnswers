import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyAwFtH59Kw0GV2t9vUUeXp5kYYIla_DJxU",
	authDomain: "sofkau-questionsanswers.firebaseapp.com",
	projectId: "sofkau-questionsanswers",
	storageBucket: "sofkau-questionsanswers.appspot.com",
	messagingSenderId: "340833965617",
	appId: "1:340833965617:web:70c5530515309d12fc2710",
	measurementId: "G-QQZFWPXZ0F"
};

const app = initializeApp(firebaseConfig);
const Auth = getAuth(app)

export default Auth;
