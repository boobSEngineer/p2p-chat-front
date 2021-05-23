import React from 'react';
import Chat from "./Chat";
import {connect} from "react-redux";
import {
    addDialogThunkCreate, addGroupChatThunkCreate, joinToGroupThunkCreate,
    removeChatThunkCreate,
    requestChatsThunkCreate,
    setCurrentChatIdCreate
} from "../../redux/chat-reducer";
import {compose} from "redux";
import {getChats} from "../../redux/select/chat-selector";
import {isAuth} from "../../redux/select/auth-selector";


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
            isAuth={this.props.isAuth}
            addGroupChat={this.props.addGroupChat}
            joinToGroup={this.props.joinToGroup}
        />
    }
}

const mapStateToProps = (state) => {
    return {
        chats: getChats(state),
        isAuth: isAuth(state),
    }
}

export default compose(
    connect(mapStateToProps,
        {
            leaveChat:removeChatThunkCreate,
            addDialog:addDialogThunkCreate,
            addGroupChat:addGroupChatThunkCreate,
            joinToGroup:joinToGroupThunkCreate,
            setChats: requestChatsThunkCreate,
            setCurrentChatId:setCurrentChatIdCreate
        }
    ),
)(chatContainer);
