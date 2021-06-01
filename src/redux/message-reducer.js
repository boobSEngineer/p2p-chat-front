import {chatPeer} from "./p2p/p2p-chat";
import {change} from "redux-form";
import {lastActivityThunkCreate} from "./chat-reducer";

const ADD_MESSAGE = 'ADD-MESSAGE';
const MARK_MESSAGE = 'MARK-MESSAGE'

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
        case MARK_MESSAGE: {
            return {
                ...state,
                messages: state.messages.map(c => {
                    if (c.messageUid === action.messageUid) {
                        return {...c, delivered: true}
                    }
                    return c
                })

            }
        }
        default:
            return state;
    }
}

export const addMessageCreate = (newMessageText, chatId, senderUid, messageUid) => {
    return {type: ADD_MESSAGE, newMessageText, chatId, senderUid, messageUid}
}

export const markMessageDeliveredCreate = (messageUid) => {
    return {type: MARK_MESSAGE, messageUid}
}

export const sendMessageThunkCreate = (newMessageText, chatId, uid) => {
    return (dispatch) => {
        let messageUid = chatPeer.sendMessage(chatId, newMessageText);
        dispatch(addMessageCreate(newMessageText, chatId, uid, messageUid));
        dispatch(change("AddMessageForm", "newText", ""));
        dispatch(lastActivityThunkCreate(chatId));
    }
}

export default messageReducer;
