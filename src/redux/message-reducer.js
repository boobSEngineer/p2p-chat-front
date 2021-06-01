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
                        senderUid: action.senderUid,
                        messageUid: action.messageUid,
                        delivered: false,
                        timestamp: Date.now(),
                    }],
            };
        default:
            return state;
    }
}

export const addMessageCreate = (newMessageText, chatId, senderUid, messageUid) => {
    return {type: ADD_MESSAGE, newMessageText, chatId, senderUid, messageUid}
}

export const sendMessageThunkCreate = (newMessageText, chatId, uid) => {
    return (dispatch) => {
        let messageUid = chatPeer.sendMessage(chatId, newMessageText);
        dispatch(addMessageCreate(newMessageText, chatId, uid, messageUid));
        dispatch(change("AddMessageForm", "newText", ""));
    }
}

export default messageReducer;
