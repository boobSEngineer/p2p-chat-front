import React from "react";
import {connect} from "react-redux";
import {loginThunkCreate} from "../../redux/auth-reducer";
import {compose} from "redux";
import Login from "./Login";
import {Redirect} from "react-router-dom";

const LoginContainer = (props) => {
    if (props.isAuth) return <Redirect to={"/dialog"}/>
    return <Login {...props}/>

}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, { }))(LoginContainer);



