# AWS Reset IAM Password!


## What is this for?
If you are tired of manually resetting every time then this utility is for you.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

## Pre-Requisites

- Following are required to reset **AWS IAM Passwords**,
> - **AWS Cli**
> - **AWS Profiles** (Setup at ~/.aws/credentials file)
> - **Node.js >= 12**
> - **npm >= 6.14**

## Usage
Then install this utility as global npm-module:
```sh
npm i -g aws-reset-iam-password
```
Then run the below command
```sh
aws-reset-iam-password
```
**OR**
####
You can run this directly using the command below
```sh
npx aws-reset-iam-password username='<AWS_USERNAME>'
```
###
- For `AWS alias profile` you can choose between *****all***** or *****profile1,profile2***** and so on
- For `AWS credentials file path` you can use the system default path *****~/.aws/credentials***** or enter your own path
- For `AWS user name` enter your ***AWS IAM*** username


## Note:
- This Script will only update those **AWS IAM Passwords** which are configured in your machine!

[downloads-image]: https://img.shields.io/npm/dt/aws-reset-iam-password.svg
[npm-url]: https://www.npmjs.com/package/aws-reset-iam-password.svg
[npm-image]: https://img.shields.io/npm/v/aws-reset-iam-password.svg
