import React from 'react';
import {connect} from "react-redux";
import Header from "./Header";
import {loginThunkCreate, logoutThunkCreate, terminateProfileThunkCreate} from "../../redux/auth-reducer";
import {editProfilePasswordThunkCreate, editProfileUsernameThunkCreate} from "../../redux/profile-reduser";

class HeaderContainer extends React.Component {
    // componentDidMount() {
    //     let userId = this.props.match.params.userId;
    //     if (!userId) {
    //         userId = this.props.authorizedUserId;
    //     }
    //     //this.props.getProfile(userId);
    // }

    render() {
        return <Header {...this.props} />
    }
}

const MapStateToProps = (state) => {
    return {
        username:state.auth.username,
        uid:state.auth.uid,
        isAuth:state.auth.isAuth,

    }
}
export default connect(MapStateToProps,
    {
        logOut: logoutThunkCreate,
        editProfileUsername:editProfileUsernameThunkCreate,
        editProfilePassword:editProfilePasswordThunkCreate,
        terminateProfile:terminateProfileThunkCreate,
    }
)(HeaderContainer);