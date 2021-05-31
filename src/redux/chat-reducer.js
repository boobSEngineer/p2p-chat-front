import {chatAPI} from "../API/api";
import {chatPeer} from "./p2p/p2p-chat";
import {addMessageCreate} from "./message-reducer";

const SET_CHATS = 'SET-CHATS';
const SET_CURRENT_CHATID = 'SET-CURRENT_CHATID';
const SET_INVITE = 'GET-INVITE';
const SET_ERROR = 'SET-ERROR'

let initialState = {
    chats: [],
    currentChatId: null,
    invite: null,
    error: null,
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
                currentChatId: action.chatId,
                invite: null,
            }
        }
        case SET_INVITE: {
            return {
                ...state,
                invite: action.invite
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.catch_error
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

export const setInviteGroupCreate = (invite) => {
    return {type: SET_INVITE, invite}
}

export const setErrorCreate = (catch_error) => {
    return {type: SET_ERROR, catch_error}
}

export const addDialogThunkCreate = (youId, catch_error) => {
    return (dispatch) => {
        chatAPI.addNewDialog(youId)
            .then(chat => {
                if (chat) {
                    dispatch(requestChatsThunkCreate());
                } else {
                    dispatch(setErrorCreate(catch_error));
                }
            })
    }
}

export const addGroupChatThunkCreate = (chatName, catch_error) => {
    return (dispatch) => {
        chatAPI.createGroupChat(chatName)
            .then(chat => {
                if (chat) {
                    dispatch(requestChatsThunkCreate());
                } else {
                    dispatch(setErrorCreate(catch_error));
                }
            })
    }
}

export const removeChatThunkCreate = (chatId) => {
    return (dispatch) => {
        chatAPI.leaveChat(chatId)
            .then(chat => {
                dispatch(setCurrentChatIdCreate(null));
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
    return (dispatch) => {
        chatAPI.addNewDialog(senderUid)
            .then(chat => {
                dispatch(addMessageCreate(text, chat.chatId, senderUid));
                dispatch(requestChatsThunkCreate());
            })
    }

}

export const joinToGroupThunkCreate = (inviteUid, catch_error) => {
    return (dispatch) => {
        chatAPI.joinToGroup(inviteUid)
            .then(chat => {
                if (chat) {
                    dispatch(requestChatsThunkCreate());
                } else {
                    dispatch(setErrorCreate(catch_error));
                }
            })
    }
}

export const setInviteThunkCreate = (chatId, catch_error) => {
    return (dispatch) => {
        debugger
        chatAPI.getInvite(chatId)
            .then(invite => {
                if (invite) {
                    dispatch(setInviteGroupCreate(invite));
                } else {
                    dispatch(setErrorCreate(catch_error));
                }

            })
    }
}

export const setNewInviteThunkCreate = (chatId, catch_error) => {
    return (dispatch) => {
        debugger
        chatAPI.getNewInvite(chatId)
            .then(invite => {
                if (invite) {
                    dispatch(setInviteGroupCreate(invite));
                } else {
                    dispatch(setErrorCreate(catch_error));
                }

            })
    }
}

export const renameGroupThunkCreate = (chatId, newChatName, catch_error) => {
    return (dispatch) => {
        chatAPI.renameGroup(chatId, newChatName)
            .then(chat => {
                if(chat){
                    dispatch(requestChatsThunkCreate());
                }
                else {
                    dispatch(setErrorCreate(catch_error));
                }
            })
    }
}

export default chatReducer;