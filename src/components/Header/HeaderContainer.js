import React from 'react';
import {connect} from "react-redux";
import Header from "./Header";

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
        login:state.auth.login,
        isAuth:state.auth.isAuth,
        authorizedUserId: state.auth.userId,
    }
}
export default connect(MapStateToProps, {})(HeaderContainer);