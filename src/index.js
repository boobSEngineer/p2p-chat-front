import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/redux-store";

import {Peer} from "./p2p/Peer";
import {uuid} from "uuidv4";

const P2P_SIGNALLING_SERVER = "ws://192.168.43.60:8080/socket";
{
    let peer = new Peer(uuid(), { signallingServer: P2P_SIGNALLING_SERVER });
    let targetUid = prompt("input user uid, your uid:", peer.uid);

    peer.on("message", (senderUid, data) => {
        console.log("message from " + senderUid + ": " + data);
    });
    if (targetUid && targetUid !== peer.uid) {
        peer.sendTo(targetUid, "message", "hello");
    }
}

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
