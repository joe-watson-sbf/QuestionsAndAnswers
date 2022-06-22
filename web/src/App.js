import React from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom'
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
import UpdateUser from './pages/connexion/UpdateUser/UpdateUser';
import UpdateQuestion from './pages/question/UpdateQuestion';
import SingleQuestion from './pages/question/SingleQuestion';
import SingleAnswer from './pages/answer/SingleAnswer';




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
						

					<Routes>

						<Route exact path="/" element={<HomePage/>} />
						<Route exact path="/questions" element={<QuestionsPage/>} /> 
						<Route exact path="question" element={<SingleQuestion/>} >
							<Route exact path=":id" element={<SingleQuestionPage/>} />
							<Route exact path="update/:id" element={<UpdateQuestion/>} />
						</Route>

						<Route exact path="/answer" element={<SingleAnswer/>} >
							<Route exact path=":id" element={<AnswerFormPage/>} />
						</Route>

						
						<Route exact path="/list" element={<OwnerQuestionsPage/>} />
						<Route exact path="/new" element={<QuestionFormPage/>} />

						<Route exact path="/account" element={<UpdateUser dispatch={dispatch} /> } />
						<Route path="*" element={<HomePage/>}/>

					</Routes>
				</> :
				<>
					<PublicNavbar />

					<Routes>

						<Route exact path="/" element={<HomePage/>}/>
						<Route exact path="/questions" element={<QuestionsPage/>}/>
						<Route exact path="/question" element={<SingleQuestionPage/>} />

						<Route exact path="question" element={<SingleQuestion/>} >
							<Route exact path=":id" element={<SingleQuestionPage/>} />
						</Route>

						<Route exact path="/answer" element={<SingleAnswer/>} >
							<Route exact path=":id" element={<AnswerFormPage/>} />
						</Route>
						
						<Route exact path="/login" element={<SignIn dispatch={dispatch} /> } />
						<Route path="*" element={<HomePage/>}/>

					</Routes>
				</>
			}
			<Footer />
		</Router>

		
	)
}


export default App
