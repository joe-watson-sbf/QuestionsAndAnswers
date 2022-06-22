import React from 'react'
import { Link } from 'react-router-dom'
import Auth from '../connexion/Auth'
const HomePage = () => {





	return (

		<div className="home-page">
			<h1 > Hello </h1>
			
			<h3 > 
				{(Auth.currentUser && Auth.currentUser.displayName) &&
				Auth.currentUser.displayName} 
			</h3>

			<div className='welcome' >
				{Auth.currentUser ?
					<p style={{ fontSize: '1.7rem'}}>Welcome back to question and answer blog</p> :
					'Welcome to question and answer blog'
				}

			</div>
			<div className='views-link'>
			<Link to="/questions" className="button">
				View Questions
			</Link>
			</div>

		</div>
	)
}
export default HomePage
