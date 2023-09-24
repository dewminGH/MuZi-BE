# ICBT PROJECT [CL/BSCSD/25/08] G.H.T.T Dewmin @dewminGH

# This is SLS serverless back-end build using (type script) template Serverless - AWS Node.js Typescript

# ----------Information About Template & Folder Structure at README.md -----------#

# ------------------------------ Deployment steps --------------------------------#

# deploy steps :

1: Create & configure AWS account
2: configure your cli with your account
3.1 [optinal]: check your aws account
aws sts get-caller-identity --query Account --output text
4: deployment command
`sls deploy --stage [your stage] --region [your region]`
5: remove deployment
`sls remove --stage [your stage] --region [your region]`

# ---------------------------------configure envs ------------------------------#

# `configure envs directly to lambda functions`
