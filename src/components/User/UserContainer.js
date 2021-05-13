import React from 'react';
import User from "./User";
import {connect} from "react-redux";
import {setUserCreate} from "../../redux/user-reducer";
import {compose} from "redux";



const mapStateToProps = (state) => {
    return {
        users: state.userPage.users
    }
}

export default compose(
    connect(mapStateToProps, {setUsers:setUserCreate}),
    (User)) ;