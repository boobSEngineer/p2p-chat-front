import './App.css';
import React from "react";
import {Redirect, Route} from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import {initializeAppThunkCreate} from "./redux/app-reducer";
import {connect} from "react-redux";
import {compose} from "redux";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import DialogPage from "./Pages/DialogPage";
import {ErrorModalContainer} from "./components/common/Alert";
import {ModalMembersContainer} from "./components/Dialogs/HeaderChat/AlertMembers";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        return (
            <div className="content-root">
                <HeaderContainer/>
                <ErrorModalContainer/>
                <Route path='/dialog' render={() => <DialogPage/>}/>
                <Route path='/register' render={() => <RegisterPage/>}/>
                <Route path='/login' render={() => <LoginPage/>}/>
                <Route path='/' render={() => <Redirect to={"/dialog"}/>}/>
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
