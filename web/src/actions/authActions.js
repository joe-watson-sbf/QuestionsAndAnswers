
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const login = (email, uid) => ({ type: LOGIN, payload: {email, uid} })

export const logout = () => ({
    type: LOGOUT
});



