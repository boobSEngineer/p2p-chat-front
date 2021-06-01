import React from "react";
import MessageToast from "./MessageToast";

const MessageToastList = (props) => {
    return <>
        <div style={{position: "absolute", bottom: 0, zIndex: 1000, width: "40vw"}}>
            {
                props.toasts.map(t => {
                    return <MessageToast toast={t} chat={props.chats.find(c => c.chatId === t.chatId)}
                                         removeToast={props.removeToast} setCurrentChatId={props.setCurrentChatId}/>
                })
            }
        </div>
    </>
}

export default MessageToastList;