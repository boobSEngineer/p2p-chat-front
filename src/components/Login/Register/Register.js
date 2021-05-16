import React from "react";
import {Field, reduxForm} from "redux-form";
import {required} from "../../../utils/utils";
import {FieldWithError} from "../../common/FormsControl/FormsControl";



const RegisterForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name={'username'} component={'input'} component={FieldWithError("input")} placeholder={"Username"} validate={[required]}/>
        </div>
        <div>
            <Field name={'password'} component={'input'} component={FieldWithError("input")} placeholder={"Password"} validate={[required]}/>
        </div>
        <div>
            <button>Register</button>
        </div>
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
