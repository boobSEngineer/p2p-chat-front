import React from 'react';
import s from './Chat.module.css';
import HeaderNavbar from "./HeaderChat/HeaderNavbar";
import {Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import ChatContainer from "./ChatContainer";
import HeaderNavbarWithHooks from "./HeaderChat/HeaderNavbar";


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
                        <ListGroup variant="flush">
                            {
                                props.chats.map(c =>
                                    <ListGroup.Item  action style={{color:"white", background:"#2e2e2e" , borderColor: "white"}}
                                        onClick={() => {props.setCurrentChatId(c.chatId)}} key={c.chatId}>
                                        <Row>
                                            <Col sm={9}>
                                                <div>{c.chatTitle}</div>
                                                <div>{c.chatId}</div>
                                            </Col>
                                            <Col sm={3}>
                                                <Button variant="link" onClick={() => {
                                                    props.leaveChat(c.chatId)
                                                }}
                                                        style={{color: "white", "text-decoration": "none"}}>
                                                    Выйти</Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            }
                        </ListGroup>
                    </div>)
                : null
            }
        </div>
    )
}

export default Chat;