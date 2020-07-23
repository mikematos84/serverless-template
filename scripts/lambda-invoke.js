const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-1",
});

const lambda = new AWS.Lambda();

// ESM syntax is supported.
module.exports = (async () => {

  try {
    const response = await lambda.invoke({
      FunctionName: "sls-api-dev-hello",
      Payload: JSON.stringify({
        pathParameters: {
          id: 1
        }
      }),
    }).promise();

    console.log(response);
  }
  catch (err) {
    console.log(err, err.stack);
  }

})();
