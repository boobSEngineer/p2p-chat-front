import {chatAPI} from "../API/api";
import {chatPeer} from "./p2p/p2p-chat";

const SET_CHATS = 'SET-CHATS';
const SET_CURRENT_CHATID = 'SET-CURRENT_CHATID'

let initialState = {
    chats: [],
    currentChatId: null,
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CHATS: {
            return {
                ...state,
                chats: [...action.chats]
            }
        }
        case SET_CURRENT_CHATID: {
            return {
                ...state,
                currentChatId: action.chatId
            }
        }
        default: {
            return state;
        }
    }
}

export const setCurrentChatIdCreate = (chatId) => {
    return {type: SET_CURRENT_CHATID, chatId}
}
export const setChatCreate = (chats) => {
    return {type: SET_CHATS, chats}
}

export const addDialogThunkCreate = (youId) => {
    return (dispatch) => {
        chatAPI.addNewDialog(youId)
            .then(chat => {
                dispatch(requestChatsThunkCreate());
            })
    }
}

export const requestChatsThunkCreate = () => {
    return (dispatch) => {
        chatAPI.getChats()
            .then(chats => {
                dispatch(setChatCreate(chats));
                chatPeer.setChats(chats);
            })
    }
}

export default chatReducer;