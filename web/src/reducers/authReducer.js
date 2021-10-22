import * as actions from '../actions/authActions'

export const initialState = {
	name:null,
	email: null,
	uid: null
}

export default function authReducer(state = initialState, action) {
	
	switch (action.type) {
		case actions.LOGIN:
			const payload = action.payload;
			return { email: payload.email, uid: payload.uid }
		case actions.LOGOUT:
			return initialState
		case actions.UPDATE_PROFILE:
			return { 
				...state,
				name : action.payload.name,
				email: action.payload.email
			}
		default:
			return state
	}
}
