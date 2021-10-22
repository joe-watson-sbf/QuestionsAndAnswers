import React from 'react'
import { logout } from '../../../actions/authActions';
import Auth from '../Auth';

const LogOut = ({ dispatch }) => {

    return (
		Auth.currentUser && (
			<span

				onClick={() => 
					{ 
						dispatch(logout()); 
						Auth.signOut();
					}
				}
			>
				Log out
			</span>
		)
	);
}

export default LogOut
