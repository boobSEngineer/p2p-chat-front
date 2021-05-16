import React from 'react';
import {connect} from "react-redux";
import Header from "./Header";
import {logoutThunkCreate} from "../../redux/auth-reducer";

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
export default connect(MapStateToProps, {logOut: logoutThunkCreate})(HeaderContainer);