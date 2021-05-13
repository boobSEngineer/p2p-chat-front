import { EventEmitter, EventUtils } from "./Events";
import { PeerEvents } from "./Peer";

export class PeerConnection extends EventEmitter {
    constructor(peer, isInitiator) {
        super();
        this.peer = peer;
        this.targetUid = null;
        this.isInitiator = isInitiator;

        this.peerConnection = new RTCPeerConnection({
            iceServers: [
                { url: 'stun:stun.l.google.com:19302' }
            ]
        });
        this.dataChannel = null;
        this.dataChannelOpened = false;
        this.remoteDescriptionReady = false;
        this.pendingRemoteCandidates = [];

        this.pendingMessageQueue = [];

        EventUtils.listen(
            this.peerConnection,
            {
                "icecandidate": this.onLocalIceCandidate,
                "datachannel": this.onDataChannel
            },
            this
        )
    }

    connect() {
        if (this.isInitiator) {
            this._initDataChannel(
                this.peerConnection.createDataChannel("CHANNEL_NAME")
            );
            this._setLocalDescriptionAndSend();
        } else {
            console.error("connect must be called for initiator connection")
        }
    }

    _initDataChannel(dataChannel) {
        this.dataChannel = dataChannel;
        EventUtils.listen(this.dataChannel, {
            "open": () => {
                this.dataChannelOpened = true;
                this.emit("open");
                console.log("channel opened");
                while (this.pendingMessageQueue.length) {
                    this.dataChannel.send(this.pendingMessageQueue.shift());
                }
            },
            "close": () => {
                this.dataChannelOpened = false;
                this.emit("close");
                console.log("channel closed");
            },
            "message": this.onDataChannelMessage
        }, this);
    }

    _setLocalDescriptionAndSend() {
        this._getDescription()
            .then((localDescription) => {
                this.peerConnection.setLocalDescription(localDescription)
                    .then(() => {
                        this.peer.socket.send(PeerEvents.SDP, {
                            uid: this.peer.uid,
                            sdp: localDescription
                        })
                    });
            })
            .catch(error => {

            });
    }

    _getDescription() {
        return this.isInitiator ?
            this.peerConnection.createOffer() :
            this.peerConnection.createAnswer();
    }

    setRemoteDescription(sdp) {
        let remoteDescription = new RTCSessionDescription(sdp);
        this.peerConnection.setRemoteDescription(remoteDescription)
            .then(() => {
                this.remoteDescriptionReady = true;
                while (this.pendingRemoteCandidates.length) {
                    this.addRemoteCandidate(this.pendingRemoteCandidates.pop());
                }
                if (!this.isInitiator) {
                    this._setLocalDescriptionAndSend();
                }
            });
    }

    addRemoteCandidate(candidate) {
        if (this.remoteDescriptionReady) {
            this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } else {
            this.pendingRemoteCandidates.push(candidate);
        }
    }

    onLocalIceCandidate(event) {
        if (event.candidate) {
            this.peer.socket.send(PeerEvents.CANDIDATE, {
                uid: this.peer.uid,
                candidate: event.candidate
            });
        }
    }

    onDataChannel(event) {
        if (!this.isInitiator) {
            this._initDataChannel(event.channel);
        }
    }

    onDataChannelMessage(event) {
        let data;
        try {
            data = JSON.parse(event.data);
        } catch (e) {
            this.emit("error", e);
            return;
        }
        console.log("message from " + this.targetUid + " to " + this.peer.uid + ": " + event.data);
        this.emit("message", data);
    }

    send(data) {
        let msg = JSON.stringify(data);
        if (this.dataChannelOpened) {
            this.dataChannel.send(msg);
        } else {
            this.pendingMessageQueue.push(msg);
        }
    }

}