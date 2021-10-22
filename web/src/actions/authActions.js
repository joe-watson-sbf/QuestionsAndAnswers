
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE_PROFILE = "UPDATE_PROFILE";

export const login = (email, uid) => ({ type: LOGIN, payload: {email, uid} })

export const logout = () => ({
    type: LOGOUT
});

export const update_profile = (name,  email) => ( {type: UPDATE_PROFILE, payload: {name, email}})

