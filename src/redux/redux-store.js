import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import messageReducer from "./message-reducer";
import authReducer from "./auth-reducer";
import chatReducer from "./chat-reducer";
import appReducer from "./app-reducer";

let reducers = combineReducers({
    form:formReducer,
    messagePage:messageReducer,
    auth:authReducer,
    chatPage:chatReducer,
    app:appReducer,

})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;