import {chatAPI} from "../API/api";
import {chatPeer} from "./p2p/p2p-chat";
import {addMessageCreate} from "./message-reducer";

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

export const setChatsCreate = (chats) => {
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

export const addGroupChatThunkCreate = (chatName) => {
    return (dispatch) => {
        chatAPI.createGroupChat(chatName)
            .then(chat => {
                dispatch(requestChatsThunkCreate());
            })
    }
}

export const removeChatThunkCreate = (chatId) => {
    return (dispatch) => {
        chatAPI.leaveChat(chatId)
            .then(chat => {
                dispatch(requestChatsThunkCreate());
            })
    }
}

export const requestChatsThunkCreate = () => {
    return (dispatch) => {
        chatAPI.getChats()
            .then(chats => {
                dispatch(setChatsCreate(chats));
                chatPeer.setChats(chats);
            })
    }
}

export const addMessageWithoutDialogThunkCreate = (senderUid, text) => {
    return(dispatch) => {
        chatAPI.addNewDialog(senderUid)
            .then(chat => {
                dispatch(addMessageCreate(text, chat.chatId, senderUid));
                dispatch(requestChatsThunkCreate());
            })
    }

}

export const joinToGroupThunkCreate = (inviteUid) => {
    return(dispatch) => {
        chatAPI.joinToGroup(inviteUid)
            .then(chat => {
                dispatch(requestChatsThunkCreate());
            })
    }
}

export const getInviteThunkCreate = () => {
    return(dispatch) => {
        chatAPI.getInvite()
            .then(chat => {
                dispatch(requestChatsThunkCreate());
            })
    }
}

export const renameGroupThunkCreate = (chatId, newChatName) => {
    return(dispatch) => {
        chatAPI.renameGroup(chatId, newChatName)
            .then(chat => {
                dispatch(requestChatsThunkCreate());
            })
    }
}

export default chatReducer;