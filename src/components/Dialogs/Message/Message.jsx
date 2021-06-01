import React from 'react';
import s from './Message.module.css';


const Message = (props) => {
    let isMyMessage = props.message.senderUid === props.me;
    let messageDate = new Date(props.message.timestamp);
    return (
        <div className={[
            s.message,
            s.text,
            `${isMyMessage ? s.mine : ''}`,
        ].join(" ")}>
            <div className={s.bubble_container}>
                <div className={[s.bubble].join(" ")} title={Message}>
                    { !isMyMessage ? <span className={s.title_text}> {props.message.senderName} <br/> </span> : null}
                    {props.message.text}
                    {
                        <div className={s.timestamp}>
                            {messageDate.getHours() + ":" + messageDate.getMinutes()}
                            {isMyMessage ?
                                props.message.delivered ? <div className={s.checkmark}></div>
                                    :
                                    <div className={s.circle_container}>
                                        <div className={s.circle}></div>
                                        <div className={s.circle}></div>
                                        <div className={s.circle}></div>
                                    </div>
                                : null
                            }

                        </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default Message;