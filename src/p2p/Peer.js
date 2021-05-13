import { PeerConnection } from "./PeerConnection";
import {Socket} from "./Socket";
import {EventEmitter} from "./Events";


export const PeerEvents = {
    PEER_INIT: "peer_init",
    SDP: "sdp",
    CANDIDATE: "candidate",
}


export class Peer extends EventEmitter {
    constructor(uid, options) {
        super();

        this.uid = uid;
        this.socket = new Socket(options.signallingServer)
        this.socket.send(PeerEvents.PEER_INIT, { uid });

        this._connections = {};
        this._pendingCandidates = {};

        this.socket.on(PeerEvents.SDP, data => {
            let connection = this._connections[data.uid];
            if (!connection) {
                connection = this._initConnection(data.uid, false);
            }
            connection.setRemoteDescription(data.sdp);
        })

        this.socket.on(PeerEvents.CANDIDATE, data => {
            let connection = this._connections[data.uid];
            if (connection) {
                connection.addRemoteCandidate(data.candidate);
            } else {
                let pendingCandidates = this._pendingCandidates[data.uid];
                if (!pendingCandidates) {
                    pendingCandidates = this._pendingCandidates[data.uid] = [];
                }
                pendingCandidates.push(data.candidate);
            }
        });
    }

    _initConnection(uid, isInitiator) {
        let connection = this._connections[uid] = new PeerConnection(this, isInitiator);
        connection.targetUid = uid;
        if (this._pendingCandidates[uid]) {
            while (this._pendingCandidates[uid].length) {
                connection.addRemoteCandidate(this._pendingCandidates[uid].pop());
            }
        }

        connection.on("close", () => {
            if (this._connections[uid] === connection) {
                delete this._connections[uid];
            }
        });

        connection.on("message", data => {
            if (data.type) {
                this.emit(data.type, connection.targetUid, data.payload);
            }
        });

        return connection;
    }

    connect(uid) {
        let connection = this._connections[uid];
        if (!connection) {
            connection = this._initConnection(uid, true);
            connection.connect();
        }
        return connection;
    }

    getConnectionTo(uid) {
        return this._connections[uid];
    }

    sendTo(uid, type, payload) {
        this.connect(uid).send({ type, payload });
    }
}