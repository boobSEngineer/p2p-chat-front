import React from 'react';
import s from './Dialogs.module.css';
import Message from './Message/Message';
import {Field, reduxForm} from 'redux-form';
import HeaderChatGroups from './HeaderChat/HeaderChatGroups';
import {Form, Row, Container, Navbar, InputGroup, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {FormControlField} from '../common/FormsControl/FormsControl';


const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} autoComplete="off" >
            <InputGroup>
                <Field  name={"newText"} component={FormControlField} placeholder={"Enter your message"}/>
                <Button type="submit"  variant="outline-secondary" id="button-addon2">
                    Button
                </Button>
            </InputGroup>
            <input type="submit" style={{display: "none"}}/>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({form: "AddMessageForm"})(AddMessageForm);

const Dialogs = (props) => {
    let messagesElements = props.messages.map(m => <Message message={m} me={props.me}/>);
    return (
        <>
            {props.isAuth && props.currentChatId ? (
                <Container fluid className="fill-height container-for-vertical-scroll">
                    <Row>
                        <Col sm={12} style={{paddingLeft:0, paddingRight: 0}}>
                            <Navbar style={{background: "#2d2d2d"}}>
                                <Navbar.Brand>
                                    <span style={{fontSize: 18, color: "white"}}><b>{props.nameChat}</b></span><br/>
                                    <Link style={{fontSize: 12, color: "white"}}
                                          onClick={()=>{props.viewMembers(props.currentChatId, "Что-то пошло не так.")}}>
                                        кол-во участников: {props.members}
                                    </Link>
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
                        </Col>
                    </Row>

                    <Row className="fill-height">
                        <Container fluid className="fill-height container-for-vertical-scroll">
                            <Row className="fill-height">
                                <Col sm={12} >
                                    <div className="scroll-wrapper">
                                        {messagesElements}
                                        <div ref={element => {
                                            if (element != null) {
                                                element.scrollIntoView({behavior: "smooth"});
                                            }
                                        }}> </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12} >
                                    <div className={s.message_change_block}>
                                        <AddMessageFormRedux onSubmit={(values) => {
                                            if (values.newText) {
                                                props.addMessage(values.newText, props.currentChatId, props.me);
                                            }
                                        }}/>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Row>
                </Container>
            ) : null
            }
        </>
    )
}
export default Dialogs;