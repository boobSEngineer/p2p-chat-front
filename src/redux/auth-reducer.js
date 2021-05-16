import {authAPI} from "../API/api";

const SET_AUTH_DATA_USER = 'SET-AUTH-DATA-USER'


let initialState = {
    uid: null,
    login: null,
    email: null,
    isAuth: false,
    authorised:false,
}


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_DATA_USER: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
}
export const setAuthUserDataCreate = (userId, login, email, isAuth) => {
    return {type: SET_AUTH_DATA_USER, payload: {userId, login, email, isAuth}}
}

export const getAuthUserDataThunkCreate = () => {
    return (dispatch) => {
        return authAPI.getMe()
    }
}

export default authReducer;
