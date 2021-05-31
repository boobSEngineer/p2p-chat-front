import React from "react";
import {Alert, Col, Modal,Row} from 'react-bootstrap';
import {compose} from "redux";
import {connect} from "react-redux";
import {getChats} from "../../../redux/select/chat-selector";

const ModalMembers = (props) => {
    return <>
        <Modal
            show={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Alert variant="secondary"
                   style={{marginBottom: 0}}
                   // onClose={() => {
                   //     props.Колбек на закрытие модала(false или null)
                   // }} dismissible
            >
                <Alert.Heading>Все участники</Alert.Heading>
                <p>
                    {props.chats.map(c => (
                            <Row>
                                <Col>
                                    <div>{c.chatTitle}</div>
                                    <div>{c.chatId}</div>
                                    <div>{c.status}</div>
                                </Col>
                            </Row>
                        )
                    )}
                </p>
            </Alert>
        </Modal>
    </>
}

const mapStateToProps = (state) => {
    return {
        chats: getChats(state),
    }
}

export const ModalMembersContainer = compose(
    connect(mapStateToProps, {}),
)(ModalMembers);
