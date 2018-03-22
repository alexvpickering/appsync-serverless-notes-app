// need to create using aws-cli because UsernameAttributes not supported by CloudFormation
// https://forums.aws.amazon.com/thread.jspa?threadID=259349&tstart=0

var exec = require("child_process").exec;
var config = require("../config.json");

exec(
  `
    aws cognito-idp create-user-pool \
    --pool-name "${config.name}-user-pool" \
    --username-attributes "email" \
    --query "UserPool.{UserPoolId: Id, UserPoolName: Name}" \
    --output json \
    > 'user-pool.json'
  `
);
