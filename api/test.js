'use strict';

module.exports.test = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: process.env.STAGE + ': This is a test, this is just a test',
      input: event,
    }, null, 2),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
