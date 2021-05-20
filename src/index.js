import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/redux-store";

import {Peer} from "./p2p/Peer";
import {Peer2PeerChat} from "./p2p/Peer2PeerChat";
import {uuid} from "uuidv4";

// TODO: debug code, remove
const P2P_SIGNALLING_SERVER = "ws://localhost:8080/socket";
{
    /*
    let peer = new Peer(uuid(), { signallingServer: P2P_SIGNALLING_SERVER });
    let targetUid = prompt("input user uid, your uid:", peer.uid);

    peer.on("message", (senderUid, data) => {
        console.log("message from " + senderUid + ": " + data);
    });
    if (targetUid && targetUid !== peer.uid) {
        peer.sendTo(targetUid, "message", "hello");
    }*/

    //let peer1 = new Peer("uuid1", { signallingServer: P2P_SIGNALLING_SERVER });
    //let peer2 = new Peer("uuid2", { signallingServer: P2P_SIGNALLING_SERVER });
    //peer1.sendTo(peer2.uid, "a", "b");
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


// TODO: debug code, remove
window.p2p_chat = new Peer2PeerChat({ signallingServer: "ws://localhost:8080/socket" })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
