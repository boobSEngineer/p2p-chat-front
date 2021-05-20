import {Peer2PeerChat} from "../../p2p/Peer2PeerChat";

export const chatPeer = new Peer2PeerChat({ signallingServer: "ws://192.168.86.32:8080/socket" });