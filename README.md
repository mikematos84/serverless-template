# Serverless Template

## Requirments
- [Serverless CLI](#markdown-header-install-or-update-serverless-cli)
- [AWS CLI](#install-or-update-aws-cLI)

---

## Install or Update Serverless CLI
To use the serverless template you first need to ensure that you have serverless installed. You can do so but either installing or updating serverless using the following commands.

Install: 
```terminal
npm install -g serverless
```
Update: 
```terminal
npm update -g serverless
```

>For more information on how to use serverless, please visit the Serverless Docs [here](https://serverless.com/framework/docs/)

---
## Install or Update AWS CLI
The serverless template also requires the use of the AWS CLI. To install the AWS CLI, follow the instructions found here [Installing the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) depending on your installation environment.

---

## Deploy Serverless Stack
You can deploy the serverless stack by executing the following command. You can pass optional flags such as --stage to modify deployment properties. Be default, if you do not pass a --stage flag, the deployment will default to "dev"

Deploy the stack: 
```terminal
sls deploy [--stage dev]
```
Remove the stack:
```terminal
sls remove [--stage dev]
```