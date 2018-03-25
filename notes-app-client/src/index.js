import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from "aws-appsync-react";
import { AUTH_TYPE } from "aws-appsync/lib/link/auth-link";
import appsyncOutputs from "./outputs/appsync.json";
import cognitoOutputs from "./outputs/cognito.json";
import Amplify, { Auth } from "aws-amplify";
import { ApolloProvider } from "react-apollo";

const client = new AWSAppSyncClient({
  url: appsyncOutputs.uris.GRAPHQL,
  region: appsyncOutputs.userPoolConfig.awsRegion,
  auth: {
    // Amazon Cognito user pools using AWS Amplify
    type: AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: async () =>
      (await Auth.currentSession()).getIdToken().getJwtToken()
  },
  disableOffline: false
});

Amplify.configure({
  Auth: {
    userPoolId: cognitoOutputs.UserPoolId,
    userPoolWebClientId: cognitoOutputs.UserPoolClientId
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Rehydrated>
      <App />
    </Rehydrated>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
