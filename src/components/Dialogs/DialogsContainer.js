import React from 'react';
import {addMessageCreate} from '../../redux/message-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";

const mapStateToProps = (state) => {
    return{
        messages: state.messagePage.messages,
        newMessageText: state.messagePage.newMessageText,
    }
}


export default compose (
    connect(mapStateToProps, {addMessage: addMessageCreate}),
)(Dialogs);
