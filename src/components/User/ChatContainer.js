import React from 'react';
import Chat from "./Chat";
import {connect} from "react-redux";
import {
    addDialogThunkCreate,
    removeChatThunkCreate,
    requestChatsThunkCreate,
    setCurrentChatIdCreate
} from "../../redux/chat-reducer";
import {compose} from "redux";


class chatContainer extends React.Component {
    componentDidMount() {
        this.props.setChats();
    }

    render() {
        return <Chat
            chats={this.props.chats}
            setCurrentChatId={this.props.setCurrentChatId}
            addDialog={this.props.addDialog}
            leaveChat={this.props.leaveChat}
        />
    }
}

const mapStateToProps = (state) => {
    return {
        chats: state.chatPage.chats,
    }
}

export default compose(
    connect(mapStateToProps,
        {
            leaveChat:removeChatThunkCreate,
            addDialog:addDialogThunkCreate,
            setChats: requestChatsThunkCreate,
            setCurrentChatId:setCurrentChatIdCreate
        }
    ),
)(chatContainer);
