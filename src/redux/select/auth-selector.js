export const getMe = (state) => {
    return state.auth.uid;
}

export const isAuth = (state) => {
    return state.auth.isAuth;
}