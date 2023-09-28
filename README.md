# ICBT PROJECT -BE [CL/BSCSD/25/08] G.H.T.T Dewmin @dewminGH

# This is SLS serverless back-end build using (type script) template Serverless - AWS Node.js Typescript

# --Deployment steps

# install dependencies

[using-yarn] :`yarn`
[using-npm] :`npm install`

# deploy steps :

1: Create & configure AWS account
2: configure your cli with your account
3.1 [optinal]: check your aws account
aws sts get-caller-identity --query Account --output text
4: deployment command
`sls deploy --stage [your stage] --region [your region]`
5: remove deployment
`sls remove --stage [your stage] --region [your region]`

# --configure ENV for Lambda

[LAMBDA] : [ENV]  
[confirmSignUp] : `CLIENT_ID` , `REGION` , `USER_POOL_ID`
[deleteUser] : `REGION`
[userGetNewTokens] : `CLIENT_ID` , `REGION`
[getUser] : `CLIENT_ID` , `REGION`
[signIn] : `CLIENT_ID` , `REGION`
[signUp] : `CLIENT_ID` , `REGION`

# `configure envs directly to lambda functions`

# --Information About Template & Folder Structure

.
├── src
│ ├── functions # Lambda configuration and source code folder
│ │ ├── hello
│ │ │ ├── handler.ts # `Hello` lambda source code
│ │ │ ├── index.ts # `Hello` lambda Serverless configuration
│ │ │ ├── mock.json # `Hello` lambda input parameter, if any, for local invocation
│ │ │ └── schema.ts # `Hello` lambda input event JSON-Schema
│ │ │
│ │ └── index.ts # Import/export of all lambda configurations
│ │
│ └── libs # Lambda shared code
│ └── apiGateway.ts # API Gateway specific helpers
│ └── handlerResolver.ts # Sharable library for resolving lambda handlers
│ └── lambda.ts # Lambda middleware
│
├── package.json
├── serverless.ts # Serverless service file
├── tsconfig.json # Typescript compiler configuration
├── tsconfig.paths.json # Typescript paths
└── webpack.config.js # Webpack configuration

```

```
