import {chatAPI} from "../API/api";

const SET_CHATS = 'SET-CHATS';

let initialState = {
    chats: [],
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHATS: {
            return {
                ...state,
                chats: [...action.chats]
            }
        }
        default: {
            return state;
        }
    }
}

export const setChatCreate = (chats) => {
    return {type: SET_CHATS, chats}
}

export const requestChatsThunkCreate = () => {
    return (dispatch) => {
        chatAPI.getChats()
            .then(data => {
                dispatch(setChatCreate(data));
            })
    }
}

export default chatReducer;