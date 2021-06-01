import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import messageReducer, {addMessageCreate, markMessageDeliveredCreate} from './message-reducer';
import authReducer from './auth-reducer';
import chatReducer, {addMessageWithoutDialogThunkCreate, lastActivityThunkCreate} from './chat-reducer';
import appReducer from './app-reducer';
import {chatPeer} from './p2p/p2p-chat';

let reducers = combineReducers({
    form: formReducer,
    messagePage: messageReducer,
    auth: authReducer,
    chatPage: chatReducer,
    app: appReducer,

})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;

chatPeer.on('message', (chatId, senderUid, messageUid, text) => {
    store.dispatch(addMessageCreate(text, chatId, senderUid, messageUid))
    store.dispatch(lastActivityThunkCreate(chatId));
})

chatPeer.on('message_delivered', (messageUid) => {
    store.dispatch(markMessageDeliveredCreate(messageUid))
})

chatPeer.on('new_dialog', (senderUid, messageUid, text) => {
    store.dispatch(addMessageWithoutDialogThunkCreate(senderUid, messageUid, text))
})