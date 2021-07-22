function loadActivityEvent(client, logger) {
    return client.user.setActivity("f!help");
}

module.exports = loadActivityEvent;