import React from 'react';
import Chat from "./Chat";
import {connect} from "react-redux";
import {addDialogThunkCreate, requestChatsThunkCreate, setCurrentChatIdCreate} from "../../redux/chat-reducer";
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
            addDialog:addDialogThunkCreate,
            setChats: requestChatsThunkCreate,
            setCurrentChatId:setCurrentChatIdCreate
        }
    ),
)(chatContainer);
