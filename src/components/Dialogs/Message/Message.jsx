import React from 'react';
import s from './Message.module.css';


const Message = (props) => {
    let messageDate = new Date(props.message.timestamp);
    return (
        <div className={[
            s.message,
            s.text,
            `${props.message.senderUid === props.me ? s.mine : ''}`,
        ].join(" ")}>
            <div className={s.bubble_container}>
                <div className={[s.bubble].join(" ")} title={Message}>
                    {props.message.text}
                    {
                        <div className={s.timestamp}>
                            { messageDate.getHours() + ":" + messageDate.getMinutes() }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Message;