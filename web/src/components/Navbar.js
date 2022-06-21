import React from 'react'
import { Link } from 'react-router-dom'
import MyIconImg from './MyIconImg/MyIconImg';

export const PublicNavbar = () => (
	<nav>
		<div>
			<MyIconImg />
		</div>
		<div>
			<Link to="/">Home</Link>
			<Link to="/questions">Questions</Link>
		</div>
		<div>
			<Link to="/login"> Log In </Link>
		</div>

	</nav>
)

export const PrivateNavbar = (props) => (
	<nav>
		<div>
			<MyIconImg />
		</div>
		<div>
			<Link to="/">Home</Link>
			<Link to="/questions">Questions</Link>
			<Link to="/new">New</Link>
			<Link to="/list">List</Link>
		</div>
		<div className='action'>
			<Link to="/account">Update Profil</Link>
			{props.children}
		</div>
	</nav>
)
