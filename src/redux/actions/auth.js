import { AUTH_LOGGED_SUCCESSFULLY, AUTH_LOGGED_FAILED, AUTH_LOGOUT, AUTH_LOGGING_ATTEMPT } from './actionTypes'

export const loginAttempt = (email, password) => {
    return {
        type: AUTH_LOGGING_ATTEMPT,
        user: {
            email,
            password
        }
    }
}

export const loginSuccess = (response) => {
    return {
        type: AUTH_LOGGED_SUCCESSFULLY,
        response
    }
}

export const loginFailed = (error) => {
    return {
        type: AUTH_LOGGED_FAILED,
        error
    }
}

export const logoutRequest = () => {
    return {
        type: AUTH_LOGOUT
    }
}