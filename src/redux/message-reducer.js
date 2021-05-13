const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {
    messages: [
        {id: 1, message: 'I...I...'},
        {id: 2, message: 'HOLY MOLLY'},
        {id: 3, message: 'WOW OWO OWO WOW'},
        {id: 4, message: 'Shit'}
    ],
}

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = action.newMessageText;
            return {
                ...state,
                messages: [...state.messages, {id: 0, message: newMessage}],
            };
        default:
            return state;
    }
}
export const addMessageCreate = (newMessageText) => {
    return {type: ADD_MESSAGE, newMessageText}
}

export default messageReducer;
