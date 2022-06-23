# AWS Reset IAM Password!


## What is this for?
If you are tired of manually resetting/updating AWS IAM passwords then this utility is for you.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

## Pre-Requisites

- Following are required to reset **AWS IAM Passwords**,
> - **AWS Cli** (Configured for profiles)
> - **Node.js >= 12**
> - **npm >= 6.14**

## Usage
Install the utility as global npm module:
```sh
npm i -g aws-reset-iam-password
```
Now run the command below
```sh
aws-reset-iam-password
```
**OR**
####
You can run this directly using the command below:
```sh
npx aws-reset-iam-password
```
###
- For `AWS alias profile` Enter comma seperated profiles *****profile1,profile2*****  (Default value is ****all****)
- For `AWS credentials file path` Enter the path of **AWS credentials** file (Default value is *****~/.aws/credentials*****)
- For `AWS user name` Enter your ***AWS IAM*** username

###
#### Note:
- This script will only update **AWS IAM Passwords** which are configured for access & secret keys in your machine!

[downloads-image]: https://img.shields.io/npm/dt/aws-reset-iam-password.svg
[npm-url]: https://www.npmjs.com/package/aws-reset-iam-password.svg
[npm-image]: https://img.shields.io/npm/v/aws-reset-iam-password.svg
