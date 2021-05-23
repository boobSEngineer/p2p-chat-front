import React from 'react';
import {sendMessageThunkCreate} from '../../redux/message-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {
    getCurrentChatId,
    getMessagesByCurrentId,
    getNameByChatId,
    getNewMessageText
} from "../../redux/select/chat-selector";
import {getMe, isAuth} from "../../redux/select/auth-selector";
import {renameGroupThunkCreate} from "../../redux/chat-reducer";

const mapStateToProps = (state) => {
    return{
        messages: getMessagesByCurrentId(state),
        newMessageText: getNewMessageText(state),
        currentChatId:getCurrentChatId(state),
        me:getMe(state),
        isAuth:isAuth(state),
        nameChat:getNameByChatId(state),

    }
}

export default compose (
    connect(mapStateToProps, {
        addMessage: sendMessageThunkCreate,
        renameGroup:renameGroupThunkCreate,
    }),
)(Dialogs);
