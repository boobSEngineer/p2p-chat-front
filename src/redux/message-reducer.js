const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
    messages: [
        {chatId: 'g38', senderUid: "akjfhjka-aaasnd-asbsa-asnsansa", text: 'OMG'},
        {chatId: 'g38',senderUid: "a122112-121221-1212121", text: 'wow'},
        {chatId: 'd35', senderUid: "ffff-fffff-ffff", text: 'hi'},
        {chatId: 'd34', senderUid: "afafafa-afgfgg-nggbgbgbg", text: 'wow'},
    ],
}

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = action.newMessageText;
            return {
                ...state,
                text: [...state.text, {chatId: action.chatId, text: newMessage}],
            };
        default:
            return state;
    }
}
export const addMessageCreate = (newMessageText, chatId, uid) => {
    return {type: ADD_MESSAGE, newMessageText, chatId, uid}
}

export default messageReducer;
