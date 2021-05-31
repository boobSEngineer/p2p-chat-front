import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Register from "./Register";
import {registerThunkCreate} from "../../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {isAuth, isInitialized} from "../../../redux/select/auth-selector";

const RegisterContainer = (props) => {
    if (props.isAuth && props.isInitialized) return <Redirect to={"/dialog"}/>
    return <Register {...props}/>

}

const mapStateToProps = (state) => {
    return {
        isAuth: isAuth(state),
        isInitialized: isInitialized(state),

    }
}

export default compose(
    connect(mapStateToProps, {registerThunkCreate}))(RegisterContainer);



