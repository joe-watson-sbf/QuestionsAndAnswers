import React from 'react'
import { logout } from '../../../actions/authActions';
import Auth from '../Auth';
import { signOut } from "firebase/auth";
import { Link } from 'react-router-dom';

const LogOut = ({ dispatch }) => {

    return (
		Auth.currentUser && (
			<Link to='/'

				onClick={() => 
					{ 
						dispatch(logout()); 
						signOut(Auth);
					}
				}
			>
				Log out
			</Link>
		)
	);
}

export default LogOut
