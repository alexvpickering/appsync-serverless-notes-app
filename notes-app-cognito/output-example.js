var exec = require("child_process").exec;

function handler(data, serverless, options) {
  console.log("Received Stack Output", data);
  // create test user
  exec(
    `
      aws cognito-idp sign-up \
      --region us-east-2 \
      --client-id ${data.UserPoolClientId} \
      --username YOUR_EMAIL_ADDRESS \
      --password Passw0rd! && \

    aws cognito-idp admin-confirm-sign-up \
      --region us-east-2 \
      --user-pool-id ${data.UserPoolId} \
      --username YOUR_EMAIL_ADDRESS
  `
  );
}

module.exports = { handler };
