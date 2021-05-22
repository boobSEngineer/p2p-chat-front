import React from 'react';
import s from './Chat.module.css';
import AddDialog from "./newChat/addDialog";


const Chat = (props) => {
    return (
        <div>
            <div>
                <AddDialog addDialog={props.addDialog}/>
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
        </div>
    )
}

export default Chat;