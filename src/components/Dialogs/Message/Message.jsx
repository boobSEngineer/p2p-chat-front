import React from 'react';
import s from './Message.module.css';


const Message = (props) => {
    return (
        <div className={[
            s.message,
            s.text,
            `${props.me ? s.mine : ''}`,
        ].join(" ")}>

            <div className={s.bubble_container}>
                <div className={[s.bubble].join(" ")} title={Message}>
                    {props.message.text}
                </div>
            </div>
        </div>
    )
}

export default Message;