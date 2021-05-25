import React from "react";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../utils/utils";
import {FieldWithError} from "../../common/FormsControl/FormsControl";
import {Button, Form} from "react-bootstrap";


const RegisterForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Field name={'username'} component={FieldWithError} placeholder={"Username"}
                       validate={[required]}/>
            </Form.Group>
            <Form.Group>
                <Field name={'password'} component={FieldWithError} placeholder={"Password"}
                       validate={[required]}/>
            </Form.Group>
                <Button variant='primary' type='submit'>Register</Button>
        </form>
}

const RegisterReduxForm = reduxForm({form: 'register'})(RegisterForm);

const Register = (props) => {
    const onSubmit = (formData) => {
        props.registerThunkCreate(formData.username, formData.password);
    }
    return <div>
        <h1>Register</h1>
        <RegisterReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Register;
