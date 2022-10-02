---
title: Asynchronously invoking Lambda function from another Lambda
tags:
  - AWS
categories:
  - Work_仕事
sticky: 999
comments: true
lang: en
draft: published
type: HEXO/post
sitemap: true
toc: false
tocOpen: true
indexing: true
display_tag_onHome: true
recommendedSection: false
donate: false
geolocation: 'Chiba, Japan'
mathjax: false
share: false
copyright: true
sourceUrl: >-
  https://enlear.academy/asynchronously-invoking-lambda-function-from-another-lambda-c469d27625ca
sourceAuthor: Ankit Aabad
sourceAuthorImg: 'https://miro.medium.com/fit/c/176/176/1*pLM25Hn4dxmn9llRKdQ_rA.jpeg'
img: >-
  /2022/0505/Work_仕事/Asynchronously-invoking-Lambda-function-from-another-Lambda/1_JhQGnGnaYgDNiaImXyPMZQ.jpeg
openGraph_img: >-
  /2022/0505/Work_仕事/Asynchronously-invoking-Lambda-function-from-another-Lambda/1_JhQGnGnaYgDNiaImXyPMZQ.jpeg
excerpt: >-
  It's good to know what you can do with the AWS services, but it's equally
  important, if not more, to know what you cannot do. Lambda has limitations
  that require workarounds to overcome.
sourcePublishDate: 2022-01-14 00:00:00
date: 2022-05-05 21:44:04
updated: 2022-05-05 21:44:04
---
 <!-- ![](./Asynchronously-invoking-Lambda-function-from-another-Lambda/1_JhQGnGnaYgDNiaImXyPMZQ.jpeg) -->

 It's good to know what you can do with the AWS services, but it's equally important, if not more, to know what you cannot do. A good solution architect knows the limitations of the different AWS services like Lambda, API Gateway, DynanoDB, etc.

 AWS Lambda has a timeout of 15mins and API Gateway has a timeout of just 30 seconds. If you trigger a lambda from API Gateway, the lambda will also time out in 30 seconds. If you want to perform some time-consuming tasks in lambda invoked from APIGateway, how do we circumvent this problem. Since the lambda triggered by the API Gateway will timeout in 30 seconds, we don't have much choice but to invoke another lambda. There are multiple ways in which we can do this.

 * Using SQS
 * Step Functions
 * Async Lambda Invocations

 Async lambda invocation is the simplest and straightforward way to go about this problem. Async invocation means that the lambda that invokes the other lambda does not wait for the second lambda to finish and immediately returns. There are 2 lambdas. We will call them lambda-one and lambda-two. Lambda-one is invoked using APIGateway, and then lambda-one invokes the lambda-two asynchronously.

 ![](./Asynchronously-invoking-Lambda-function-from-another-Lambda/1_qf6ewuR2JarokODDr2F6EA.png)

 Required things to invoke lambda:

 1. **Name of the function we want to invoke**: Serverless, while creating the lambda, constructs the function name by appending the service name and stage name to the function name. If the service name is `experiment` and stage is `dev`, then our second lambda's function name becomes `experiment-dev-lambda-two`. so we pass the FUNCTION_PREFIX ( which consists of service name and stage ) into env in `serverless.yml` file.

{% gist 7c8cc0cbb237290f94bca4c64b20b362 function_name.yml %}

 and we construct the function name using the function prefix that we receive from the environment.

```javascript
const FunctionName = `${process.env.FUNCTION_PREFIX}-${function_name}`;
```

 2. **Permissions**: We also need to give permission to invoke the other lambda. so we allow for "lambda:InvokeFunction" and "lambda:InvokeAsync" in the "iamRoleStatements" in "serverless.yml".

 3. **Payload**: for payload, we use the "casual" npm package to generate some fake data. We use "casual.card_data" to generate some card data.

{% gist 68118f08039719bf8dba8654099701c0 fake.js %}


 We need to stringify the data that we send as payload to the lambda-two, and lambda-two receives a parsed version of the payload in the event.

 4. **InvocationType**: By default, the invocation is done synchronously. To invoke lambda asynchronously, we need to set "InvocationType" as "Event" in the invoke method of the lambda.

{% gist ce89523922727a8c94ce8558d8f1737e lambda-one.js %}

 In `lambda-two` , we will just print the payload. Remember, we don't need to parse it. What we receive is a JSON object.

{% gist 1cc144ef46de8ff1de20a526eff2a79b lambda-two.js %}

 ![Cloudwatch logs](./Asynchronously-invoking-Lambda-function-from-another-Lambda/1_1aF4sOE1X8uyddv9_JrYMw.png)

 The full source code can be found here:
 {% ghcard ankitaabad/Async-Lambda-Invoke %}

 I hope you enjoyed reading the post as much as I enjoyed writing it.🥰

