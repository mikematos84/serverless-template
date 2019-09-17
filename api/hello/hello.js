'use strict';

const ServerlessUtils = require('../serverless-utils');

module.exports.handler = async (event, context, callback) => {
  const response = JSON.stringify({
    message: process.env.STAGE + ': This is a test, this is just a test',
    input: event,
  }, null, 2)

  return ServerlessUtils.Response(response);
};
