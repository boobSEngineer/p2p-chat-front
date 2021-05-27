import React from "react";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../utils/utils";
import {FieldWithError} from "../../common/FormsControl/FormsControl";
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";


const RegisterForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <Container>
            <Form.Group as={Row} controlId="formBasicEmail">
                <Form.Label column sm="2">
                    Username
                </Form.Label>
                <Col sm="5">
                    <Field name={'username'} component={FieldWithError} placeholder={"Username"}
                           validate={[required]}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formBasicPassword">
                <Form.Label column sm="2">
                    Password
                </Form.Label>
                <Col sm="5">
                    <Field name={'password'} component={FieldWithError} placeholder={"Password"}
                           validate={[required]}/>
                </Col>
            </Form.Group>
            {props.error && <Alert variant="danger">
                <Alert.Heading>ОШИБОЧКА</Alert.Heading>
                <p>
                    {props.error}
                </p>
            </Alert>}
            <Button variant='dark' type='submit'>Зарегистрироваться</Button>{' '}
        </Container>
    </form>
}

const RegisterReduxForm = reduxForm({form: 'register'})(RegisterForm);

const Register = (props) => {
    const onSubmit = (formData) => {
        props.registerThunkCreate(formData.username, formData.password);
    }
    return <div>
        <h1>Зарегистрироваться</h1>
        <RegisterReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Register;
