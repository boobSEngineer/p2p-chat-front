import React from 'react';
import s from './../Dialogs.module.css';

const Message = (props) => {
    return (
        <div className={s.messages}>
            <div className={s.message}>{props.message.text}</div>
        </div>
    )
}

export default Message;