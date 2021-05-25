import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {required} from '../../utils/utils';
import {FieldWithError} from '../common/FormsControl/FormsControl';
import {Button, Form} from 'react-bootstrap';


const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>

            <Form.Group controlId="formBasicEmail">
                <Field name={'username'} component={FieldWithError} placeholder={"Username"}
                       validate={[required]}/>
            </Form.Group>
            <Form.Group>
                <Field name={'password'} component={FieldWithError} placeholder={"Password"}
                       validate={[required]}/>
            </Form.Group>
            <Button variant='primary' type='submit'>Login</Button>{' '}
        </form>

}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.loginThunkCreate(formData.username, formData.password);
    }
    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Login;
