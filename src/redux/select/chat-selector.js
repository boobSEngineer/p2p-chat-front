import {createSelector} from "reselect";

export const getMessages = (state) => {
    return state.messagePage.messages;
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