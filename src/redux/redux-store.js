import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import messageReducer, {addMessageCreate} from './message-reducer';
import authReducer from './auth-reducer';
import chatReducer, {addMessageWithoutDialogThunkCreate} from './chat-reducer';
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

chatPeer.on('message', (chatId, senderUid, text) => {
    store.dispatch(addMessageCreate(text, chatId, senderUid))
})

chatPeer.on('new_dialog', (senderUid, text) => {
    store.dispatch(addMessageWithoutDialogThunkCreate(senderUid, text))
})