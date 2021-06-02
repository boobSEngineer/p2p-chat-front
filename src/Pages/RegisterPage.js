import React from "react";
import {Row, Col, Container} from "react-bootstrap";
import RegisterContainer from "../components/Login/Register/RegisterContainer";

const RegisterPage = (props) => {
    return <Container fluid className="fill-height">
        <Row style={{
            background: "#f8f9fa",
            paddingRight: 0,
            paddingLeft: 0,
        }} className="fill-height">
            <Col sm={4}>
            </Col>
            <Col sm={7}>
                <RegisterContainer/>
            </Col>
        </Row>
    </Container>
}
export default RegisterPage;