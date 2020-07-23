'use strict';

const ServerlessUtils = require('../serverless-utils');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });

AWS.config.update({ region: 'us-east-1' });

module.exports.handler = async (event, context, callback) => {
  const { path, queryStringParameters, headers, body } = event;

  try {
    const response = await getItem(event.pathParameters.id);
    return ServerlessUtils.Response(response);
  } catch (err) {
    return ServerlessUtils.Response(err);
  }
};

let params = {
  TableName: process.env.DEFAULT_TABLE
}

const getItem = async (userId = 1) => {

  try {
    const data = await docClient.get({
      ...params,
      Key: {

        'USER_ID': parseInt(userId)
      }
    }).promise();
    return data;
  } catch (err) {
    return err;
  }
}

const getAll = async () => {
  try {
    const data = await docClient.scan(params).promise();
    return data;
  } catch (err) {
    return err;
  }
}

