const ADD_TOAST = 'ADD-TOAST';
const REMOVE_TOAST = 'REMOVE-TOAST';

let initialState = {
    toasts: [],
}

const toastReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TOAST: {
            return {
                ...state,
                toasts: [...state.toasts,
                    {
                        ...action.payload
                    }]
            }
        }
        case REMOVE_TOAST: {
            debugger
            return {
                ...state,
                toasts: state.toasts.filter(c => {
                    return c.uid !== action.uid;
                })
            }
        }
        default:
            return state;
    }
}

export const addToastCreate = (uid, title, text, chatId) => {
    return {type: ADD_TOAST, payload: {uid, title, text, timestamp: Date.now(), chatId}}
}

export const removeToastCreate = (uid) => {
    return {type: REMOVE_TOAST, uid}
}

export const addMessageToastThunkCreate = (messageUid, messageTitle, messageText, chatId) => {
    return (dispatch) => {
        dispatch(addToastCreate(messageUid, messageTitle, messageText, chatId))
    }
}

export default toastReducer;
