import React from 'react';
import Chat from "./Chat";
import {connect} from "react-redux";
import {requestChatsThunkCreate, setCurrentChatIdCreate} from "../../redux/chat-reducer";
import {compose} from "redux";


class chatContainer extends React.Component {
    componentDidMount() {
        this.props.setChats();
    }

    render() {
        return <Chat
            chats={this.props.chats}
            setCurrentChatId={this.props.setCurrentChatId}
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
            setChats: requestChatsThunkCreate,
            setCurrentChatId:setCurrentChatIdCreate
        }
    ),
)(chatContainer);
