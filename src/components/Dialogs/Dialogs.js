import React from 'react';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import {Field, reduxForm} from 'redux-form';
import HeaderChatGroups from "./HeaderChat/HeaderChatGroups";
import {Row, Container, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";


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
                <>
                    <Navbar style={{background:"#2d2d2d"}}>
                        <Navbar.Brand>
                            <span style={{fontSize: 18, color: "white"}}><b>{props.nameChat}</b></span><br/>
                            <Link style={{fontSize: 12, color: "white"}}> кол-во участников: {props.members} </Link>
                        </Navbar.Brand>
                        {props.chatType === "GROUP_CHAT" ? (
                            <Navbar.Collapse className="justify-content-end">
                                <HeaderChatGroups
                                    renameGroup={props.renameGroup}
                                    currentChatId={props.currentChatId}
                                    nameChat={props.nameChat}
                                    setInvite={props.setInvite}
                                    invite={props.invite}
                                    setNewInvite={props.setNewInvite}
                                    members={props.members}
                                />
                            </Navbar.Collapse>) : null
                        }
                    </Navbar>
                    <Container>
                        {messagesElements}
                        <div className={s.message_change_block}>
                            <AddMessageFormRedux onSubmit={(values) => {
                                props.addMessage(values.newText, props.currentChatId, props.me)
                            }
                            }/>
                        </div>
                    </Container>
                </>
            ) : null
            }
        </div>
    )
}
export default Dialogs;