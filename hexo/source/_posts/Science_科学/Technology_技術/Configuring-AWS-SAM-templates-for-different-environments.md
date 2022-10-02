---
title: Configuring AWS SAM templates for different environments
tags:
  - AWS
categories:
  - Science_科学
  - Technology_技術
sticky: 999
comments: true
lang: en
draft: published
type: HEXO/post
sitemap: true
toc: true
tocOpen: true
indexing: true
display_tag_onHome: true
recommendedSection: false
donate: false
geolocation: Chiba, Japan
mathjax: false
share: false
copyright: true
sourceUrl: https://medium.com/@TomKeeber/configuring-aws-sam-templates-for-different-environments-64043e281fdc
sourceAuthor: Tom Keeber
sourceAuthorImg: https://miro.medium.com/fit/c/176/176/1*pNXqtGFSfbof2xXATsOr1g.jpeg
img: /2022/0420/Science_科学/Technology_技術/Configuring-AWS-SAM-templates-for-different-environments/20180703082833.png
openGraph_img: /2022/0420/Science_科学/Technology_技術/Configuring-AWS-SAM-templates-for-different-environments/20180703082833.png
date: 2022-04-20 17:59:55
updated: 2022-04-20 17:59:55
sourcePublishDate: 2018-12-04
excerpt: Use AWS SAM with Parameter Store to build multiple environments across multiple AWS accounts securely.
---
 *This article presumes basic knowledge of AWS lambdas and AWS Parameter Store*

## Introduction
 All systems are different, however one of very common problems which nearly all software has is how to deploy to different environments, usually starting in a local or development environment and ending in a production environment.

 The [12 factor app](https://12factor.net/) [^1] approach to deployment defines a number of approaches to solving various aspects of supporting multiple environments. This article focuses on two of those approaches: [Configuration](https://12factor.net/config) and [Environmental Parity](https://12factor.net/dev-prod-parity).

[^1]: [12 factor app: eBook](./Configuring-AWS-SAM-templates-for-different-environments/12factor.epub)

 One of the key points of these approaches is that the same code should be deployed to every environment with differences in configuration (URLs, usernames, databases URI, feature switches). With AWS we can go a step further than that and not only have the same code across environments, but also the same infrastructure by using AWS Cloudformation (and/or SAM).

 This is called ***I**nfrastructure **a**s **C**ode* and is an extremely powerful way of managing your entire stack.

 You won’t see any AWS console screens in this post. It’s code all the way. Everyone should be doing this and make sure you are version controlling your templates!


{% noteblock info %}

One common practice to support different environment is to set up different AWS accounts for each environment, for example, you might have the following environments; development, QA, pre-production and production which you would set up different AWS accounts. This might seem slightly strange at first, it definitely did for me. However, this gives you a huge amount of flexibility and control in managing your environments and is considered AWS best practice.

{% endnoteblock %}

 **EDIT January 2019**: A update to the above recommendation. We’ve found that we have hit certain account limits with the approach above (one of which is Filter Subscription limits). We’re now planning using different accounts for different part of our architecture and each environment. So for example, we might have a “website-dev”, “website-production”, “stockmanagement-dev”, and “stockmanagement-production” accounts.

 For more on limits see here https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html


## Cloudformation
AWS Cloudformation and AWS Parameter Store can combine together to create AWS stacks which have 12 factor attributes.
Let’s look at an example of a basic Cloudformation template snippet which defines a lambda and API gateway which requires some database connection details (hostname/username/password)

{% gist 19ec0cc0360914debf040682965e9ef9 cloudformation-basic-lambda-hard-coded-vars.yaml %}

 There are a few problems with the above template. We would not be able to deploy to multiple environments and be able to support different usernames/passwords and hostnames. Never mind the fact that our username and password are stored in plain text living inside our source control.

 So let’s make this template slightly better by introducing parameters to our template.

{% gist 12f54b76016f0013f8027f5fc5fe2144 cloudformation-basic-lambda-env-vars.yaml %}

 You can see now that there is no reference to the actual username/password or database host values within the template. We’ve now separated configuration and code and could stop there and expect variables to be passed into the template.

 However, let’s go a step further and manage these variables via AWS Parameter Store.

{% noteblock info %}

Parameter Store is a AWS product that allows you to manage configuration items in our AWS stack. It allows create, read, update and delete operations on key value pairs. You define the name, type and value of the parmeter and can then look up the parameters using Cloudformation.

{% endnoteblock %}

{% gist 9fa0cf5f96b32b8e1438b20bae7a6985 cloudformation-basic-lambda-using-parameter-store.yaml %}

 Looking at the above you can see we have changed the Parameter Type to a Parameter Store Type and and introduced a ‘Default’ property for each variable.

 The Default properties value is the key to the Parameter Store variable to be looked up and populated.


## Migration Path for existing Parameters
 One of the gotchas with Cloudformation and Parameter Store is migrating already defined Parameters to use Parameter Store values.

 So in our second example we have a number of parameters defined, if this template has already been deployed to AWS and we were to convert the type to `Aws::Sam::Parameter::Value<String>` and redeploy then unfortunately this will fail (February 2019 &mdash; issue raised with AWS)

 In order to get around this you can use Dynamic references to look up the variables like so;

```json
'{{resolve:ssm:MyParameterStoreVariableName:1}}'
```


{% noteblock info %}

**EDIT: September 2010**: Resolving the parameters like this requires you to give a version number. We’ve found this to mean an extra maintenance overhead that we’re not prepared to accept. *i.e.* everytime we update the Parameter Store variable we’ll also need to update our cloudformation template to the new version.

{% endnoteblock %}

A full example would look like this.

{% gist 5d9321919d5fdc85a257fcf912c3829d parameter-store-dynamic-references %}

 That’s it! So much simpler and you get rid of a load of boiler plate code too!

 You can now set up Parameter Store variables for each account which contain environment specific information.


## The gotchas
 Parameter Store works well on the whole, but there are some gotchas that you need to be aware of.
 * Custom Domain Names must be lower case! Expect to receive a`403 Forbidden` for any upper case letters in the custom domain name. Also watch out for domain name length limits.
 * For the purposes of this article I used Parameter Store to hold the database username/password. This approach should not be used in practice &mdash; sensitive information should be stored in Secret Manager or Secure Strings.
 * If you have a existing Parameter and you change that to a Parameter Store variable you need to pay delete the stack, delete or rename the variable first. This also applies to changing the Default value of a Parameter. I’ve spoke to AWS about this and they admit this is far from ideal.
 * When putting a http as a string into Parameter Store beware that Parameter Store tries to be clever and look up that URL and populate the content. You need to wrap up the http in json when putting.
 * Storing secure strings &mdash; Cloudformation only support for certain Resources. So you can’t just pass in a ENV &mdash; you need to use one of the support types.


## Reference
