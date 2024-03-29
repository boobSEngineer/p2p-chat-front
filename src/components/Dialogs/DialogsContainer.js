import React from 'react';
import {sendMessageThunkCreate} from '../../redux/message-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {
    getCurrentChatId, getInvite, getMemberCountByChatId,
    getMessagesByCurrentId,
    getNameByChatId,
    getNewMessageText, getTypeChat
} from "../../redux/select/chat-selector";
import {getMe, isAuth, isInitialized} from "../../redux/select/auth-selector";
import {
    renameGroupThunkCreate,
    setInviteThunkCreate,
    setNewInviteThunkCreate, viewMembersThunkCreate
} from "../../redux/chat-reducer";
import {Redirect} from "react-router-dom";
import Login from "../Login/Login";


const DialogContainer = (props) => {
    if (!props.isAuth && props.isInitialized) return <Redirect to={"/login"}/>
    return <Dialogs {...props}/>

}

const mapStateToProps = (state) => {
    return{
        messages: getMessagesByCurrentId(state),
        newMessageText: getNewMessageText(state),
        currentChatId:getCurrentChatId(state),
        me:getMe(state),
        isAuth:isAuth(state),
        isInitialized:isInitialized(state),
        nameChat:getNameByChatId(state),
        invite:getInvite(state),
        members:getMemberCountByChatId(state),
        chatType:getTypeChat(state),

    }
}

export default compose (
    connect(mapStateToProps, {
        addMessage: sendMessageThunkCreate,
        renameGroup:renameGroupThunkCreate,
        setInvite:setInviteThunkCreate,
        setNewInvite:setNewInviteThunkCreate,
        viewMembers:viewMembersThunkCreate,
    }),
)(DialogContainer);
