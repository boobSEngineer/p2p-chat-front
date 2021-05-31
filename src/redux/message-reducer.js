import {chatPeer} from "./p2p/p2p-chat";
import {change} from "redux-form";

const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
    messages: [],
    newMessageText: '',
}

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messages: [...state.messages,
                    {
                        chatId: action.chatId,
                        text: action.newMessageText,
                        senderUid: action.uid,
                        timestamp: Date.now(),
                    }],
            };
        default:
            return state;
    }
}

export const addMessageCreate = (newMessageText, chatId, uid) => {
    return {type: ADD_MESSAGE, newMessageText, chatId, uid}
}

export const sendMessageThunkCreate = (newMessageText, chatId, uid) => {
    return (dispatch) => {
        dispatch(addMessageCreate(newMessageText, chatId, uid));
        chatPeer.sendMessage(chatId, newMessageText);
        dispatch(change("AddMessageForm", "newText", ""));
    }
}

export default messageReducer;
