var exec = require("child_process").exec;
var config = require("../config.json");

exec(
  `aws appsync get-graphql-api \
     --api-id ${config.apiId} \
     --query graphqlApi \
     --output json \
     > "../../${config.name}-client/src/outputs/appsync.json"
  `
);
