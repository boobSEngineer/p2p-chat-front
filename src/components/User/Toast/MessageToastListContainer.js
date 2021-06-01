import React from "react";
import MessageToastList from "./MessageToastList";
import {compose} from "redux";
import {connect} from "react-redux";
import {getMessagesByCurrentId, getNewMessageText} from "../../../redux/select/chat-selector";
import {addToastCreate, removeToastCreate} from "../../../redux/toast-reducer";
import {getToasts} from "../../../redux/select/toast-selector";

// const MessageToastListContainer = (props) => {
//     return <MessageToastList {...props}/>
// }

const mapStateToProps = (state) => {
    return{
        toasts:getToasts(state),
    }
}

export default compose (
    connect(mapStateToProps, {
        removeToast:removeToastCreate,
    }),
)(MessageToastList);