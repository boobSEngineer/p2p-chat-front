import React from 'react';
import s from './Chat.module.css';
import HeaderNavbar from "./HeaderChat/HeaderNavbar";


const Chat = (props) => {
    return (
        <div>
            { props.isAuth ? (
                <div>
                    <div>
                        <HeaderNavbar
                            addDialog={props.addDialog}
                            addGroupChat={props.addGroupChat}
                            joinToGroup={props.joinToGroup}
                        />
                    </div>
                    {
                        props.chats.map(c =>
                            <div>
                                <div onClick={() => {props.setCurrentChatId(c.chatId)}} key={c.chatId} className={s.nav}>
                                    <div>{c.chatId}</div>
                                    <div>{c.chatTitle}</div>
                                </div>
                                <div>
                                    <button onClick={()=>{props.leaveChat(c.chatId)}}>Удалить чат</button>
                                </div>
                            </div>
                        )
                    }
                </div>)
                : null
            }
        </div>
    )
}

export default Chat;