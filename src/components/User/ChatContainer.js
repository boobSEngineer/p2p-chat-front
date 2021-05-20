import React from 'react';
import Chat from "./Chat";
import {connect} from "react-redux";
import {requestChatsThunkCreate} from "../../redux/chat-reducer";
import {compose} from "redux";


class chatContainer extends React.Component {
    componentDidMount() {
        this.props.setChats();
    }

    render() {
        return <Chat
            chats={this.props.chats}
        />
    }
}

const mapStateToProps = (state) => {
    return {
        chats: state.chatPage.chats
    }
}

export default compose(
    connect(mapStateToProps,
        {
            setChats: requestChatsThunkCreate
        }
    ),
)(chatContainer);
