import React from "react";
import {Row, Col, Container, Toast as ToastContainer} from "react-bootstrap";
import DialogsContainer from "../components/Dialogs/DialogsContainer";
import ChatNavbar from "./ChatNavbar";
import {ModalMembersContainer} from "../components/Dialogs/HeaderChat/AlertMembers";
import MessageToastListContainer from "../components/User/Toast/MessageToastListContainer";


const DialogPage = (props) => {
    return <>
        <ModalMembersContainer/>
        <Container fluid className="fill-height">
            <Row className="fill-height">
                <Col sm={4}
                     style={{
                         background: "#2e2e2e",
                         paddingRight: 0,
                         paddingLeft: 0,
                         borderWidth: 1,
                         borderRight: "solid gray 1px",
                         "borderColor": "gray"
                     }}>
                    <ChatNavbar/>
                </Col>
                <Col sm={8}
                     style={{
                         background: "#f8f9fa",
                         paddingRight: 0,
                         paddingLeft: 0
                     }}>
                    <DialogsContainer/>
                </Col>
            </Row>
        </Container>
        <MessageToastListContainer/>
    </>
}
export default DialogPage;