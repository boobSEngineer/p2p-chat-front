import { EventEmitter } from "./Events";
import {Logger} from "./Logger";

export class Socket extends EventEmitter {
    constructor(url) {
        super()

        this._url = url;
        this._pending = [];
        this._open = false;
        this.reopen();

        this.onopen = () => {};
        this.onclose = () => {};
        this.onerror = e => console.error(e);
    }

    reopen() {
        this._socket = new WebSocket(this._url);
        this._open = false;

        this._socket.onmessage = msg => {
            let data;
            try {
                data = JSON.parse(msg.data);
            } catch (e) {
                if (this.onerror) {
                    this.onerror(e);
                }
                return;
            }
            this.emit(data.type, data.payload);
        }

        this._socket.onopen = () => {
            Logger.debug("socket opened")
            while (this._pending.length) {
                this._socket.send(this._pending.shift());
            }
            this._open = true;
            this.onopen();
        }

        this._socket.onclose = () => {
            this.onclose();
            Logger.debug("socket close, trying to reopen")
            this._open = false;
            setTimeout(() => {
                this.reopen()
            }, 2000)
        };

        this._socket.onerror = e => {
            this.onerror(e);
            this._open = false;
        }
    }

    send(type, payload) {
        let msg = JSON.stringify({ type, payload });
        if (this._open) {
            this._socket.send(msg);
        } else {
            this._pending.push(msg);
        }
    }

    close() {
        console.log("manually closing socket")
        this._socket.onopen = null;
        this._socket.onmessage = null;
        this._socket.onerror = null;
        this._socket.onclose = null;
        this._open = false;
        this._socket.close()
        this.onclose();
    }
}