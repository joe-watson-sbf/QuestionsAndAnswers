import React from 'react'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom'
import "firebase/firestore";
import "firebase/auth";
import { login} from './actions/authActions';
import { PublicNavbar, PrivateNavbar } from './components/Navbar'
import HomePage from './pages/home/HomePage'
import SingleQuestionPage from './pages/question/SingleQuestionPage'
import QuestionsPage from './pages/question/QuestionsPage'
import QuestionFormPage from './pages/question/QuestionFormPage'
import AnswerFormPage from './pages/answer/AnswerFormPage'
import OwnerQuestionsPage from './pages/question/OwnerQuestionsPage'
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from './components/footer/Footer';
import Auth from './pages/connexion/Auth';
import SignIn from './pages/connexion/SignIn/SignIn';
import LogOut from './pages/connexion/LogOut/LogOut';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateUser from './pages/connexion/UpdateUser/UpdateUser';
import UpdateQuestion from './pages/question/UpdateQuestion';




const App = ({ dispatch }) => {

	const [user] = useAuthState(Auth);

	if (user) {
		dispatch(login(user.email, user.uid))
	}

	return (
		<Router>
			{user ?
				<>
					<PrivateNavbar>
						<LogOut dispatch={dispatch}/>
					</PrivateNavbar>
						

					<Switch>

						<Route exact path="/" component={HomePage} />
						<Route exact path="/questions" component={QuestionsPage} />
						<Route exact path="/question/:id" component={SingleQuestionPage} />
						<Route exact path="/question/update/:id" component={UpdateQuestion} />
						<Route exact path="/list" component={OwnerQuestionsPage} />
						<Route exact path="/answer/:id" component={AnswerFormPage} />
						<Route exact path="/new" component={QuestionFormPage} />
						<Route exact path="/account" render={()=> <UpdateUser dispatch={dispatch} /> } />
						<Redirect to="/" />

					</Switch>
				</> :
				<>
					<PublicNavbar />

					<Switch>

						<Route exact path="/" component={HomePage}/>
						<Route exact path="/questions" component={QuestionsPage} />
						<Route exact path="/question/:id" component={SingleQuestionPage} />
						<Route exact path="/answer/:id" component={AnswerFormPage} />
						<Route exact path="/login" render={()=> <SignIn dispatch={dispatch} /> } />
						<Redirect to="/" />

					</Switch>
				</>
			}
			<Footer />
		</Router>
	)
}


export default App
