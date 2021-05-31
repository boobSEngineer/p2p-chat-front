const SET_USER_PROFILE = 'SET-USER-PROFILE';

let initialState = {
    profile: null
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile:action.profile,
            }
        }
        default: {
            return state;
        }
    }
}

export const setUserProfileCreate = (profile) => {
    return {type: SET_USER_PROFILE, profile}
}

export default profileReducer;