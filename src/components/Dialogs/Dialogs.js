import React from 'react';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import {Field, reduxForm} from 'redux-form';
import HeaderChat from "../User/HeaderChat/HeaderChat";


const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name={'newText'} component={'textarea'} placeholder={"Enter your message"}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: 'AddMessageForm'})(AddMessageForm);

const Dialogs = (props) => {
    let messagesElements = props.messages.map(m => <Message message={m}/>);
    return (
        <div>
            {props.isAuth ? (
                <div>
                    <div>
                        <HeaderChat/>
                    </div>
                    <div>
                        {messagesElements}
                        <div className={s.message_change_block}>
                            <AddMessageFormRedux onSubmit={(values) => {
                                props.addMessage(values.newText, props.currentChatId, props.me)
                            }
                            }/>
                        </div>
                    </div>
                </div>
            ) : null
            }
        </div>
    )
}
export default Dialogs;