'use strict';

const ServerlessUtils = require('../serverless-utils');

module.exports.handler = async (event, context, callback) => {
  return ServerlessUtils.Response(process.env);
};

