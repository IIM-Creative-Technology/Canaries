//this file is to format the messages to be sent to the client
const moment = require('moment');

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('ddd, h:mm a'),
    };
}

module.exports = formatMessage;