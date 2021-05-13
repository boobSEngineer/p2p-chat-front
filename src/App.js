import './App.css';
import User from "./components/User/User";
import React from "react";
import Header from "./components/Header/Header";
import {Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import LoginContainer from "./components/Login/LoginContainer";

function App() {
  return (
      <div className='wrapper'>
          <Header/>
          <User/>
        <div className='wrapper_content'>
            <Route path='/dialog' render={() =>  <DialogsContainer/>}/>
            <Route path='/login' render={() => <LoginContainer/>}/>
        </div>
      </div>
  );
}

export default App;
