import React from 'react';
import s from './Chat.module.css';


const Chat = (props) => {
    return (
        <div>{
            props.chats.map(c =>
                <div onClick={()=>{props.setCurrentChatId(c.chatId)}}  key={c.chatId} className={s.nav}>
                    <div>{c.chatId}</div>
                    <div>{c.chatTitle}</div>
                </div>)
        }
        </div>
    )
}

export default Chat;