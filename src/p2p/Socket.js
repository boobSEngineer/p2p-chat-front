import { EventEmitter } from "./Events";

export class Socket extends EventEmitter {
    constructor(url) {
        super()

        this._socket = new WebSocket(url);
        this._pending = [];
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
            while (this._pending.length) {
                this._socket.send(this._pending.shift());
            }
            this._open = true;
        }

        this._socket.onclose = () => this._open = false;

        this.onerror = e => console.error(e);
    }

    send(type, payload) {
        let msg = JSON.stringify({ type, payload });
        if (this._open) {
            this._socket.send(msg);
        } else {
            this._pending.push(msg);
        }
    }
}