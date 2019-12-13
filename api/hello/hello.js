'use strict';

const ServerlessUtils = require('../serverless-utils');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

AWS.config.update({ region: 'us-east-1' });

module.exports.handler = async (event, context, callback) => {
  try {
    const response = await getItem();
    return ServerlessUtils.Response(response);
  } catch (err) {
    return ServerlessUtils.Response(err);
  }
};

const getItem = async () => {
  const params = {
    TableName: process.env.DEFAULT_TABLE,
    Key: {
      'USER_ID': 1
    }
  }

  try {
    const data = await docClient.get(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}
