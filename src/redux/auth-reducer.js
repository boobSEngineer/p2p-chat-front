import {authAPI} from "../API/api";
import {stopSubmit} from "redux-form";
import {requestChatsThunkCreate, setChatCreate} from "./chat-reducer";
import {chatPeer} from "./p2p/p2p-chat";

const SET_AUTH_DATA_USER = 'SET-AUTH-DATA-USER'


let initialState = {
    uid: null,
    username: null,
    isAuth: false,
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
};

export const setAuthUserDataCreate = (uid, username, isAuth) => {
    return {type: SET_AUTH_DATA_USER, payload: {uid, username, isAuth}}
};

export const getAuthUserDataThunkCreate = () => {
    return (dispatch) => {
        return authAPI.getMe()
            .then(data => {
                if(data !== null) {
                    let {uid, username} = data;
                    dispatch(setAuthUserDataCreate(uid, username, true));
                    chatPeer.setPeerUid(uid);
                }
            })
    }
};

export const registerThunkCreate = (username, password) => {
    return (dispatch) => {
        return authAPI.registerUser(username, password)
            .then(data => {
                if(data.success) {
                    dispatch(getAuthUserDataThunkCreate())
                    dispatch(requestChatsThunkCreate())
                } else {
                    let message = data.error
                    dispatch(stopSubmit("register", {_error: message}))
                }
            })
    }
}

export const loginThunkCreate = (username, password) => {
    return (dispatch) => {
        return authAPI.logIn(username, password)
            .then(data => {
                if(data.success) {
                    dispatch(getAuthUserDataThunkCreate())
                    dispatch(requestChatsThunkCreate())
                } else {
                    let message = data.error
                    dispatch(stopSubmit("login", {_error: message}))
                }
            })
    }
}

export const logoutThunkCreate = () => {
    return (dispatch) => {
        return authAPI.logOut()
            .then(data => {
                if(data.success) {
                    dispatch(setAuthUserDataCreate(null, null, false));
                    dispatch(setChatCreate([]));
                }
            })
    }
}

export default authReducer;
