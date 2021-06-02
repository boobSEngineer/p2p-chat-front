import {chatPeer} from "./p2p/p2p-chat";
import {change} from "redux-form";
import {lastActivityThunkCreate} from "./chat-reducer";
import {userAPI} from "../API/api";

const ADD_MESSAGE = 'ADD-MESSAGE';
const MARK_MESSAGE = 'MARK-MESSAGE';
const SET_NAME_MESSAGE = 'SET-NAME-MESSAGE';

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
                        senderName: null,
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
        case SET_NAME_MESSAGE: {
            return {
                ...state,
                messages: state.messages.map(c => {
                    if (c.messageUid === action.messageUid) {
                        return {...c, senderName: action.senderName}
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

export const setMessageSenderNameCreate = (messageUid, senderName) => {
    return {type: SET_NAME_MESSAGE, messageUid, senderName}
}

export const markMessageDeliveredCreate = (messageUid) => {
    return {type: MARK_MESSAGE, messageUid}
}

export const addMessageThunkCreate = (newMessageText, chatId, senderUid, messageUid) => {
    return (dispatch) => {
        dispatch(addMessageCreate(newMessageText, chatId, senderUid, messageUid))
        userAPI.getUser(senderUid)
            .then(user => {
                    if (user) {
                        dispatch(setMessageSenderNameCreate(messageUid, user.username))
                    } else {
                        dispatch(setMessageSenderNameCreate(messageUid, senderUid))
                    }
                }
            )
    }
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
