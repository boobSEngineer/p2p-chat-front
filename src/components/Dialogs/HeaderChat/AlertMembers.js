import React from "react";
import {Alert, Col, ListGroup, Modal, Row} from 'react-bootstrap';
import {compose} from "redux";
import {connect} from "react-redux";
import {getChats, getMemberCountByChatId, getMembers} from "../../../redux/select/chat-selector";
import {setMembersCreate, viewMembersThunkCreate} from "../../../redux/chat-reducer";

const ModalMembers = (props) => {
    if (!props.members) {
        return <></>
    }

    return <>
        <Modal
            show={true}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable={true}
        >
            <Modal.Body>
                <Alert
                    onClose={() => {
                        props.setMembers(null)
                    }} dismissible>
                <Alert.Heading centered> Участники </Alert.Heading>
                    <ListGroup variant="flush">
                        {props.members.map(c => (
                                <ListGroup.Item>
                                        <span>{c.chatUser ? c.chatUser.username : null}</span>
                                        <span>{c.isCreator ? " (Создатель чата)" : " (Участник)"}</span>
                                        <div style={{color:"#999999"}}>{c.targetUid}</div>
                                </ListGroup.Item>
                            )
                        )}
                    </ListGroup>
                </Alert>
            </Modal.Body>
        </Modal>
    </>
}

const mapStateToProps = (state) => {
    return {
        chats: getChats(state),
        members:getMembers(state),
    }
}

export const ModalMembersContainer = compose(
    connect(mapStateToProps, {setMembers:setMembersCreate}),
)(ModalMembers);
