import React from "react";
import MessageToastList from "./MessageToastList";
import {compose} from "redux";
import {connect} from "react-redux";
import {removeToastCreate} from "../../../redux/toast-reducer";
import {getToasts} from "../../../redux/select/toast-selector";
import {getChats} from "../../../redux/select/chat-selector";
import {setCurrentChatIdCreate} from "../../../redux/chat-reducer";

// const MessageToastListContainer = (props) => {
//     return <MessageToastList {...props}/>
// }

const mapStateToProps = (state) => {
    return {
        toasts: getToasts(state),
        chats: getChats(state)
    }
}

export default compose(
    connect(mapStateToProps, {
        removeToast: removeToastCreate,
        setCurrentChatId:setCurrentChatIdCreate

    }),
)(MessageToastList);