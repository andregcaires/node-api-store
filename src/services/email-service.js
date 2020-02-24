'use strict';

const config = require('../config');
const sendgrid = require('sendgrid')(config.sendgridKey);

exports.send = async (to, subject, body) => {

    sendgrid.send({
        to: to,
        from: 'node-store-api@test.com',
        subject: subject,
        html: body
    });

}