import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import messageReducer from "./message-reducer";
import authReducer from "./auth-reducer";
import userReducer from "./user-reducer";
import appReducer from "./app-reducer";

let reducers = combineReducers({
    form:formReducer,
    messagePage:messageReducer,
    auth:authReducer,
    userPage:userReducer,
    app:appReducer,

})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;