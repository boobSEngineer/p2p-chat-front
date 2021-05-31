import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Register from "./Register";
import {registerThunkCreate} from "../../../redux/auth-reducer";
import {Redirect} from "react-router-dom";

const RegisterContainer = (props) => {
    if (props.isAuth) return <Redirect to={"/dialog"}/>
    return <Register {...props}/>

}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export default compose(
    connect(mapStateToProps, {registerThunkCreate}))(RegisterContainer);



