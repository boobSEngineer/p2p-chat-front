import {Peer} from "./Peer";
import {EventEmitter} from "./Events";
import {uuid} from "uuidv4";

export class Peer2PeerChat extends EventEmitter {
    constructor(options) {
        super();
        this.options = options;
        this.peer = null;
        this.chats = [];

        this._deliveredMessages = {};
    }

    setPeerUid(peerUid) {
        if (this.peer !== null) {
            if (this.peer.uid === peerUid) {
                return;
            }
            this.peer.close();
            this.peer = null;
        }

        this.peer = new Peer(peerUid, this.options);
        this.peer.on("message", this.onMessage.bind(this))
        this.peer.on("message_delivered", this.onMessageDelivered.bind(this))
    }

    setChats(chats) {
        this.chats = chats || [];
    }

    sendMessage(chatId, payload) {
        for (let chat of this.chats) {
            if (chat.chatId === chatId) {
                let messageUid = uuid();
                let message = { chat, payload, uid: messageUid };
                for (let target of chat.targets) {
                    this.peer.sendTo(target, "message", message);
                }
                return messageUid;
            }
        }
        return null;
    }

    _approveMessageDeliver(uid, message) {
        if (message.uid) {
            this.peer.sendTo(uid, "message_delivered", message.uid);
        }
    }

    onMessageDelivered(uid, messageUid) {
        if (!this._deliveredMessages[messageUid]) {
            this._deliveredMessages[messageUid] = true;
            this.emit("message_delivered", messageUid, uid);
        }
    }

    onMessage(uid, message) {
        if (message.chat) {
            // in case of dialog - find dialog chat for message sender
            if (message.chat.chatType === "DIALOG") {
                for (let chat of this.chats) {
                    if (chat.chatType === "DIALOG" && chat.targets && chat.targets[0] === uid) {
                        this.emit("message", chat.chatId, uid, message.messageUid, message.payload, "DIALOG");
                        this._approveMessageDeliver(uid, message);
                        return;
                    }
                }
                this.emit("new_dialog", uid, message.messageUid, message.payload, "DIALOG");
            }
            // in case of group chat - find it by id
            else if (message.chat.chatType === "GROUP_CHAT") {
                for (let chat of this.chats) {
                    if (chat.chatType === "GROUP_CHAT" && chat.chatId === message.chat.chatId) {
                        this.emit("message", chat.chatId, uid, message.messageUid, message.payload, "GROUP_CHAT");
                        this._approveMessageDeliver(uid, message);
                    }
                }
            }
        }
    }

}
