import {createSelector} from "reselect";

export const getMessages = (state) => {
    return state.messagePage.messages;
}

export const getError = (state) => {
    return state.chatPage.error;
}

export const getChats = (state) => {
    return state.chatPage.chats;
}

export const getInvite = (state) => {
    return state.chatPage.invite;
}

export const getTypeChat = (state) => {
    for (let chat of state.chatPage.chats) {
        if (chat.chatId === state.chatPage.currentChatId) return chat.chatType
    }
}

export const getNameByChatId = (state) => {
    for (let chat of state.chatPage.chats) {
        if (chat.chatId === state.chatPage.currentChatId) return chat.chatTitle
    }
}

export const getMemberByChatId = (state) => {
    for (let chat of state.chatPage.chats) {
        if (chat.chatId === state.chatPage.currentChatId) return chat.targets.length + 1;
    }
}

export const getCurrentChatId = (state) => {
    return state.chatPage.currentChatId;
}

export const getNewMessageText = (state) => {
    return state.messagePage.newMessageText;
}


export const getMessagesByCurrentId = createSelector(getMessages, getCurrentChatId, (messages, currentChatId) => {
    return messages.filter(messages => messages.chatId === currentChatId)
})