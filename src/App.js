import './App.css';
import React from "react";
import {Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import LoginContainer from "./components/Login/LoginContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import RegisterContainer from "./components/Login/Register/RegisterContainer";
import {initializeAppThunkCreate} from "./redux/app-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import ChatContainer from "./components/User/ChatContainer";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        return (
            <div>
                <HeaderContainer/>
                <ChatContainer/>
                <Route path='/dialog' render={() => <DialogsContainer/>}/>
                <Route path='/login' render={() => <LoginContainer/>}/>
                <Route path='/register' render={() => <RegisterContainer/>}/>
            </div>
        );
    }
}

const MapStateToProps = (state) => {
    return {
        initialized: state.app.initialized,
    }
}

export default compose(
    connect(MapStateToProps, {initializeApp: initializeAppThunkCreate})
    (App));
