import React from 'react'
import { Link} from 'react-router-dom'
import MyIconImg from './MyIconImg/MyIconImg';

export const PublicNavbar = () => (
	<nav>
		<MyIconImg />
		<section className="nav-options">
			<div>
				<Link to="/">Home</Link>
				<Link to="/questions">Questions</Link>
			</div>
			<div>
				<Link to="/login">
					<span>Log In</span>
				</Link>
			</div>
			

		</section>

	</nav>
)

export const PrivateNavbar = (props) => (
	<nav>
		<MyIconImg />
		<section className="nav-options">
			<div>
				<Link to="/">Home</Link>
				<Link to="/questions">Questions</Link>
				<Link to="/new">New</Link>
				<Link to="/list">List</Link>
			</div>
			<div>
				<p>
					<Link to="/account">
						<span>Update Profil</span>
					</Link>
				</p>
				<p>
					<li>
						{props.children}
					</li>
				</p>
			</div>
			

		</section>
	</nav>
)
