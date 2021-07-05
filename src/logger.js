"use strict";

const logger = require("pino")({
    level: process.env.NODE_ENV === "production" ? "info" : "trace"
});

module.exports = logger;