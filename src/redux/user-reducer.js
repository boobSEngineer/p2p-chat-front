const SET_USERS = 'SET-USERS';

let initialState = {
    users: [],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        default: {
            return state;
        }
    }
}

export const setUserCreate = (users) => {
    return { type: SET_USERS, users}
}

// export const requestUsersThunkCreate = (page, pageSize) => {
//     return (dispatch) => {
//         dispatch(toggleIsFetchingCreate(true));
//         dispatch(setPageCreate(page));
//         usersAPI.getUsers(page, pageSize)
//             .then(data => {
//                 dispatch(toggleIsFetchingCreate(false));
//                 dispatch(userSetCreate(data.items));
//             })
//     }
// }

export default userReducer;