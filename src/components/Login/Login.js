import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {required} from '../../utils/utils';
import {FieldWithError} from '../common/FormsControl/FormsControl';
import {Button, Form, Col, Row, Container, Alert} from 'react-bootstrap';
import ChatContainer from "../User/ChatContainer";


const LoginForm = (props) => {
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
                <Alert.Heading>ОШИБКА</Alert.Heading>
                <p>
                    {props.error}
                </p>
                </Alert>}
            <Button variant='dark' type='submit'>Войти</Button>{' '}
        </Container>
    </form>

}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginThunkCreate(formData.username, formData.password);
    }
    return <>
        <Row>
            <Container>
                <h1 style={{paddingBottom: 15}}>Войти</h1>
                <LoginReduxForm onSubmit={onSubmit}/>
            </Container>
        </Row>
    </>
}

export default Login;
