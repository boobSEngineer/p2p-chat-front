export const Logger = {
    DEBUG: 4,
    INFO: 3,
    WARNING: 2,
    ERROR: 1,
    NONE: 0,

    _logLevel: 0,
    setLevel(level) {
        this._logLevel = level;
    },

    debug(...args) {
        if (this._logLevel >= Logger.DEBUG)
            console.log(...args);
    },

    info(...args) {
        if (this._logLevel >= Logger.INFO)
            console.log(...args);
    },

    warn(...args) {
        if (this._logLevel >= Logger.WARNING)
            console.warn(...args);
    },

    error(...args) {
        if (this._logLevel >= Logger.ERROR)
            console.error(...args);
    },
};

// TODO: set to Logger.ERROR in production
Logger.setLevel(Logger.DEBUG);