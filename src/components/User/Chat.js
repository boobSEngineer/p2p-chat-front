import React from 'react';
import s from './Chat.module.css';
import HeaderNavbar from "./HeaderChat/HeaderNavbar";
import {Button, Card, Col, ListGroup, Row} from "react-bootstrap";


const Chat = (props) => {
    return (
        <div>
            {props.isAuth ? (
                    <div>
                        <div>
                            <HeaderNavbar
                                addDialog={props.addDialog}
                                addGroupChat={props.addGroupChat}
                                joinToGroup={props.joinToGroup}
                            />
                        </div>
                        {
                            props.chats.map(c =>
                                    <ListGroup>
                                            <ListGroup.Item onClick={() => { props.setCurrentChatId(c.chatId)}} key={c.chatId} className={s.nav}>
                                                <Row>
                                                    <Col sm={3}>
                                                        <Button variant="outline-primary" onClick={() => { props.leaveChat(c.chatId) }}>x</Button>
                                                    </Col>
                                                    <Col sm={8}>
                                                        <div>{c.chatTitle}</div>
                                                        <div>{c.chatId}</div>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                    </ListGroup>
                            )
                        }
                    </div>)
                : null
            }
        </div>
    )
}

export default Chat;