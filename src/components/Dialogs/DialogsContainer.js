import React from 'react';
import {addMessageCreate} from '../../redux/message-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {getCurrentChatId, getMessagesByCurrentId, getNewMessageText} from "../../redux/select/chat-selector";
import {getMe} from "../../redux/select/auth-selector";

const mapStateToProps = (state) => {
    return{
        messages: getMessagesByCurrentId(state),
        newMessageText: getNewMessageText(state),
        currentChatId:getCurrentChatId(state),
        me:getMe(state),

    }
}

export default compose (
    connect(mapStateToProps, {addMessage: addMessageCreate}),
)(Dialogs);
