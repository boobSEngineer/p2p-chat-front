import React from "react";
import {Row, Col, Container} from "react-bootstrap";
import DialogsContainer from "../components/Dialogs/DialogsContainer";
import ChatNavbar from "./ChatNavbar";

const DialogPage = (props) => {
    return <>
        <Container fluid>
            <Row>
                <Col sm={4}
                     style={{
                         background: "#2e2e2e",
                         paddingRight: 0,
                         paddingLeft: 0,
                         borderWidth:1,
                         borderRight: "solid gray 1px",
                         "borderColor":"gray"
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
    </>
}
export default DialogPage;