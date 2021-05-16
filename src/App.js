import './App.css';
import React from "react";
import {Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import LoginContainer from "./components/Login/LoginContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import UserContainer from "./components/User/UserContainer";
import RegisterContainer from "./components/Login/Register/RegisterContainer";
import {initializeAppThunkCreate} from "./redux/app-reducer";
import {connect} from "react-redux";
import {compose} from "redux";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        return (
            <div className='wrapper'>
                <HeaderContainer/>
                {/*<UserContainer/>*/}
                <div className='wrapper_content'>
                    {/*<Route path='/dialog' render={() =>  <DialogsContainer/>}/>*/}
                    <Route path='/login' render={() => <LoginContainer/>}/>
                    <Route path='/register' render={() => <RegisterContainer/>}/>
                </div>
            </div>
        );
    }
}

const MapStateToProps = (state) => {
    return {
        initialized:state.app.initialized,
    }
}

export default compose(
    connect(MapStateToProps, {initializeApp: initializeAppThunkCreate})
    (App));
