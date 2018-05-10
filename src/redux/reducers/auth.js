import { AUTH_LOGGED_SUCCESSFULLY, AUTH_LOGGED_FAILED, AUTH_LOGOUT, AUTH_LOGGING_ATTEMPT } from '../actions/actionTypes'

const initialState = {
    email: '',
    password: '',
    isLoggedIn: false,
    isLoggingIn: false,
    error: null
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGGING_ATTEMPT:
            return {
                ...state, ...{
                    isLoggingIn: true,
                    isLoggedIn: false,
                    email: '',
                    password: '',
                    error: null
                }
            };
            break;
        case AUTH_LOGGED_SUCCESSFULLY:
            return {
                ...state, ...{
                    isLoggedIn: true,
                    isLoggingIn: false,
                    email: action.response.email,
                    password: '',
                    error: null
                }
            };
        case AUTH_LOGGED_FAILED:
            return {
                ...state, ...{
                    isLoggedIn: false,
                    isLoggingIn: false,
                    email: '',
                    password: '',
                    error: action.error,
                }
            };
        case AUTH_LOGOUT:
            return {
                ...state, ...{
                    isLoggedIn: false,
                    isLoggingIn: false,
                    email: '',
                    password: '',
                    error: '',
                }
            };
        default:
            return state;
    }
}