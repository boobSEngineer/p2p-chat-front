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
import {Col, Container, Row} from "react-bootstrap";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DialogPage from "./Pages/DialogPage";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        return (
            <>
                <HeaderContainer/>
                <Route path='/dialog' render={() => <DialogPage/>}/>
                <Route path='/register' render={() => <RegisterPage/>}/>
                <Route path='/login' render={() => <LoginPage/>}/>
            </>
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
