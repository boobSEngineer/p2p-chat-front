import React from 'react';
import {addMessageCreate} from '../../redux/message-reducer';
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {getMessagesByCurrentId} from "../../redux/select/chat-selector";

const mapStateToProps = (state) => {
    return{
        messages: getMessagesByCurrentId(state),
    }
}

export default compose (
    connect(mapStateToProps, {addMessage: addMessageCreate}),
)(Dialogs);
