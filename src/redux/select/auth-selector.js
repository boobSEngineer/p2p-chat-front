export const getMe = (state) => {
    return state.auth.uid;
}

export const isInitialized = (state) => {
    return state.app.initialized;
}

export const isAuth = (state) => {
    return state.auth.isAuth;
}