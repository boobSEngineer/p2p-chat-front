import { EventEmitter, EventUtils } from "./Events";
import { PeerEvents } from "./Peer";
import {Logger} from "./Logger";

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
        this.lastChannelActivity = Date.now();

        EventUtils.listen(
            this.peerConnection,
            {
                "icecandidate": this.onLocalIceCandidate,
                "datachannel": this.onDataChannel
            },
            this
        )
    }

    _removeAllCallbacks() {
        if (this.dataChannel) {
            this.dataChannel.onopen = null;
            this.dataChannel.onclose = null;
            this.dataChannel.onmessage = null;
        }
        this.peer.onicecandidate = null;
        this.peer.ondatachannel = null;
    }

    setupCloseTimeout(timeout) {
        setTimeout(() => {
            if (!this.dataChannelOpened && this.dataChannel) {
                Logger.debug("channel open timeout expired from " + this.peer.uid + " to " + this.targetUid);
                this._removeAllCallbacks();
                this.emit("close");
            }
        }, timeout);
    }

    connect() {
        if (this.isInitiator) {
            this._initDataChannel(
                this.peerConnection.createDataChannel("CHANNEL_NAME")
            );
            this._setLocalDescriptionAndSend();
            this.setupCloseTimeout(10000);
        } else {
            Logger.error("connect must be called for initiator connection")
        }
    }

    _sendQueuedMessages() {
        while (this.pendingMessageQueue.length) {
            this.dataChannel.send(this.pendingMessageQueue.shift());
        }
    }

    _initDataChannel(dataChannel) {
        this.dataChannel = dataChannel;
        EventUtils.listen(this.dataChannel, {
            "open": () => {
                this.dataChannelOpened = true;
                this.emit("open");
                Logger.debug("channel opened from " + this.peer.uid + " to " + this.targetUid);
                this.lastChannelActivity = Date.now();
                this._sendQueuedMessages();
            },
            "close": () => {
                this.dataChannelOpened = false;
                this._removeAllCallbacks();
                this.emit("close");
                Logger.debug("channel closed from " + this.peer.uid + " to " + this.targetUid);
            },
            "message": this.onDataChannelMessage
        }, this);
    }

    _setLocalDescriptionAndSend() {
        this._getDescription()
            .then((localDescription) => {
                this.peerConnection.setLocalDescription(localDescription)
                    .then(() => {
                        Logger.debug("sending " + (this.isInitiator ? "offer" : "answer") + " sdp from " + this.peer.uid + " to " + this.targetUid);
                        this.peer && this.peer.socket && this.peer.socket.send(PeerEvents.SDP, {
                            senderUid: this.peer.uid,
                            targetUid: this.targetUid,
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
                Logger.debug("received " + (!this.isInitiator ? "offer" : "answer") + " sdp from " + this.targetUid + " to " + this.peer.uid, "content: " + JSON.stringify(sdp));
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
            Logger.debug("new local ice candidate", JSON.stringify(event.candidate))
            this.peer && this.peer.socket && this.peer.socket.send(PeerEvents.CANDIDATE, {
                senderUid: this.peer.uid,
                targetUid: this.targetUid,
                candidate: event.candidate
            });
        }
    }

    onDataChannel(event) {
        if (!this.isInitiator) {
            this._initDataChannel(event.channel);
        }
    }

    _checkChannel() {
        if (Date.now() - this.lastChannelActivity < 1000) {
            return true;
        } else {
            if (this.dataChannel) {
                this.dataChannel.send("ping");
            }
            return false;
        }
    }

    _handlePingPong(data) {
        if (data === "ping") {
            this.dataChannel.send("pong");
            this.lastChannelActivity = Date.now();
            this._sendQueuedMessages();
            return true;
        } else if (data === "pong") {
            this.lastChannelActivity = Date.now();
            this._sendQueuedMessages();
            return true;
        }
    }

    onDataChannelMessage(event) {
        if (this._handlePingPong(event.data)) {
            return;
        }

        let data;
        try {
            data = JSON.parse(event.data);
        } catch (e) {
            this.emit("error", e);
            return;
        }
        Logger.debug("message from " + this.targetUid + " to " + this.peer.uid + ": " + event.data);
        this.emit("message", data);
    }

    sendStr(s) {
        if (this.dataChannelOpened) {
            this.dataChannel.send(s);
        } else {
            this.pendingMessageQueue.push(s);
        }
    }

    send(data) {
        this.sendStr(JSON.stringify(data));
    }

}