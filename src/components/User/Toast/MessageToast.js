import React from 'react';
import {Toast} from 'react-bootstrap';
import s from './Toast.module.css'

const MessageToast = (props) => {
    let toastDate = new Date(props.toast.timestamp);
    return <>
        <Toast
            style={{
                margin:10
            }}
            show={true}
            position="bottom-end"
            autohide
            delay={30000}
            onClose={() => {props.chat && props.removeToast(props.toast.uid)}}
            onClick={() => {props.chat && props.setCurrentChatId(props.chat.chatId); props.removeToast(props.toast.uid)}}
        >
            <Toast.Header className={s.text}>
                <strong className="">{props.chat && props.chat.chatTitle}</strong>
                <small className="m-auto"/>
                <small className="text-muted">{toastDate.getHours() + ":" + toastDate.getMinutes()}</small>
            </Toast.Header>
            <Toast.Body className={s.text}>{props.toast.text}</Toast.Body>
        </Toast>
    </>
}

export default MessageToast;