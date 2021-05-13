import React from "react";
import {Field, reduxForm} from "redux-form";



const LoginForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name={'email'} component={'input'} placeholder={"Email"}/>
        </div>
        <div>
            <Field name={'password'} component={'input'} placeholder={"Password"}/>
        </div>
        <div>
            <Field name={'rememberMe'} component={"input"} type={"checkbox"}/> remember me
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    return <div>
        <h1>Login</h1>
        <LoginReduxForm />
    </div>
}

export default Login;
