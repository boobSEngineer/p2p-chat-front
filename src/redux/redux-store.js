import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from "redux-form";
import messageReducer from "./message-reducer";
import authReducer from "./auth-reducer";

let reducers = combineReducers({
    form:formReducer,
    messagePage:messageReducer,
    auth:authReducer,

})

let store = createStore(reducers);

export default store;