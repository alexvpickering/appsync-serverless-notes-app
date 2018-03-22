# appsync-serverless-notes-app

A demo package of a `graphql` React application using `aws-appsync` with `lambda` and `dynamodb` data sources. The `lambda` data source allows `graphql`
queries to return `s3` objects. The `graphql` endpoint is only available to users in a `cognito` user pool.

All aws resources are provisioned using the `serverless framework`.

## Instructions:


### client:

* folder with client app (create-react-app)
* should be named using **config.json**'s **name** value (e.g. **notes-app-client**)
* should have subfolder **src/outputs** (stores outputs of **resources**)

### resources:

* modify to suite specifics of project
* manually create deployment bucket using **config.json**'s **name** value and stage (e.g. **notes-app-prod-serverless-deployment**)
  * used as deployment bucket for all resources


#### config.json:
* __**name**__: name of app, used as prefix for resources (e.g. notes-app).
* __**camelName**__: same as **name** but camelCase (used by cognito resource to satisfy *IdentityPoolName* syntax)
* __**email**__: your email address (used to create/verify a cognito user for testing your app)
* __**password**__: password for test cognito user (must satisfy cognitos difficulty requirements).
* __**accountId**__: found here https://console.aws.amazon.com/billing/home?#/account
* __**apiId**__: Appsync apiId, used for `sls update-appsync`.
* place in *resources* directory
* add to *.gitignore*
* see **resources/config-example.json**

#### cognito:
  * run `node create-user-pool.js`:
    * creates a UserPool and saves output to **user-pool.json**
    * need until *UsernameAttributes* supported by CloudFormation
  * run `sls deploy`: 
    * creates UserPoolClient, IdentityPool, and a test user
    * saves outputs to client **src/outputs/cognito.json**

#### s3:
  * run `sls deploy`:
    * creates a bucket with CORS setup
    * saves outputs to client **src/outputs/s3.json**
  * run `node seed-data.js` to upload an object to bucket

#### dynamodb:
  * run `sls deploy`:
    * creates a table and appsync IAM role to use table
    * saves outputs to client **src/outputs/dynamodb.json**
  * run `node seed-data.js` to insert an entry into table

#### lambda:
  * run `sls deploy`:
    * creates **graphql** lambda function with *GetObject* access to above s3 bucket
    * creates appsync IAM role to use lambda function
    * saves outputs to client **src/outputs/lambda.json**
  * run `node seed-data.js` to insert an entry into table
  * run `sls logs -f graphql --tail` to monitor logs

#### appsync:
  * uses above cognito, s3, dynamodb, lambda, and associated IAM roles (deploy prior to appsync)
  * run `sls deploy-appsync` for initial deployment
  * run `sls update-appsync` to update (requires **apiId** in **config.json**)

