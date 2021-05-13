export class EventEmitter {
    constructor() {
        this._listeners = {};
    }

    emit(name, ...args) {
        let listenersByName = this._listeners[name];
        if (listenersByName) {
            for (let listener of listenersByName) {
                listener(...args);
            }
        }
    }

    on(name, listener, target) {
        let listenersByName = this._listeners[name];
        if (!listenersByName) {
            listenersByName = this._listeners[name] = [];
        }
        if (target) {
            listener = listener.bind(target);
        }
        listenersByName.push(listener)
        return this;
    }
}

export const EventUtils = {
    listen(obj, events, target) {
        for (let name in events) {
            // noinspection JSUnfilteredForInLoop
            let event = events[name];
            if (target) {
                event = event.bind(target);
            }
            obj["on" + name] = event;
        }
    }
}