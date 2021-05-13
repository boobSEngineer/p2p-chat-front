import React from 'react';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import {Field, reduxForm} from 'redux-form';


const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newMessageText'} component={'textarea'} placeholder={"Enter your message"}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form:'AddMessageForm'})(AddMessageForm);

const   Dialogs = (props) => {
    let messagesElements = props.messages.map(message => <Message dialog={message.message} key={message.uid}/>);

    return (
        <div>
            {messagesElements}
            <div className={s.message_change_block}>
                <AddMessageFormRedux onSubmit={(values)=>{props.addMessage(values.newMessageText)}}/>
            </div>
        </div>
    )
}
export default Dialogs;