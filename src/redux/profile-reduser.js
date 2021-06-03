import {profileAPI} from "../API/api";
import {getAuthUserDataThunkCreate} from "./auth-reducer";
import {setErrorCreate} from "./chat-reducer";


let initialState = {
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        default: {
            return state;
        }
    }
}

export const editProfileUsernameThunkCreate = (changesName, catch_error) => {
    return (dispatch) => {
        return profileAPI.editAccount({username: changesName})
            .then(data => {
                if(data.success){
                    dispatch(getAuthUserDataThunkCreate());
                }
                else {
                    dispatch(setErrorCreate(catch_error));
                }
            })
    }
}

export const editProfilePasswordThunkCreate = (changesPassword, catch_error) => {
    return (dispatch) => {
        return profileAPI.editAccount({password: changesPassword})
            .then(data => {
                if(data.success){
                    dispatch(getAuthUserDataThunkCreate());
                }
                else {
                    dispatch(setErrorCreate(catch_error));
                }
            })
    }
}


export default profileReducer;